<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
$email = $data['email'];
$newPassword = password_hash($data['newPassword'], PASSWORD_DEFAULT);

$query = "UPDATE users SET password = ? WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $newPassword, $email);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Password updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update password."]);
}
?>
