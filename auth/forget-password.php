<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log'); // Ensure this path is writable by the web server

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Ensure JSON response

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

include_once("../db/db_connection.php");

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    error_log("Invalid request payload");
    echo json_encode(["success" => false, "message" => "Invalid request payload"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $data['email'] ?? null;

    if (empty($email)) {
        error_log("Email is required");
        echo json_encode(["success" => false, "message" => "Email is required"]);
        exit();
    }

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Database error: " . $conn->error);
        echo json_encode(["success" => false, "message" => "Database error"]);
        exit();
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $token = bin2hex(random_bytes(50));
        $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

        $sql = "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Database error: " . $conn->error);
            echo json_encode(["success" => false, "message" => "Database error"]);
            exit();
        }
        $stmt->bind_param("sss", $token, $expiry, $email);
        if ($stmt->execute()) {
            $resetLink = "http://localhost:3000/reset-password?token=$token&email=" . urlencode($email);
            $subject = "Password Reset Request";
            $message = "Click here to reset your password: $resetLink";
            $headers = "From: no-reply@yourdomain.com";

            if (mail($email, $subject, $message, $headers)) {
                echo json_encode(["success" => true, "message" => "Password reset link sent"]);
            } else {
                error_log("Failed to send email to $email");
                echo json_encode(["success" => false, "message" => "Failed to send email"]);
            }
        } else {
            error_log("Failed to save token");
            echo json_encode(["success" => false, "message" => "Failed to save token"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Email not found"]);
    }

    $stmt->close();
    $conn->close();
}
?>
