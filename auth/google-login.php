<?php
require_once 'vendor/autoload.php'; // Load the Google API PHP Client Library

use Google_Client;
use Google_Service_Oauth2;

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
$token = $data['token'];

$client = new Google_Client(['client_id' => '292359010802-kbp57qpprhd54gdpbpsv0h3douvudfgt.apps.googleusercontent.com']);
$payload = $client->verifyIdToken($token);

if ($payload) {
    $email = $payload['email'];

    // Check if the email exists in your users table and get the user's role
    $sql = "SELECT role FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode(["success" => true, "role" => $user['role']]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid token"]);
}
?>
