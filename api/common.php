<?php
require_once('vendor/autoload.php'); // načtení knihovny pro JWT
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 'off');

define("JWT_KEY", "5wG1grc7Hb4E4uAc7Q2nL9uR7zB8eM2i7Y1wC0gN5hK8vG1pD9kF9eX6dW8yU1m6mV7");

function handleError() {
  
  $error = error_get_last();
  if ($error !== null && $error['type'] === E_ERROR) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode($error);
  }
}

function checkAuth() {
  $jwt = $_SERVER['HTTP_AUTHORIZATION'] ?? false;
  if (!$jwt) {
    return null;
  }

  $jwt = str_replace('Bearer ', '', $jwt);
  try {
    $user = JWT::decode($jwt, new Key(JWT_KEY, 'HS256'));
  } catch (\Exception $e) {
    throw $e;
    return null;
  }

  return $user;
}


register_shutdown_function('handleError');
// Nastavení CORS hlaviček
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Pokud je request metoda OPTIONS, vrátí povolené metody
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(204);
  exit();
}