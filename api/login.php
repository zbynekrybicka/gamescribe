<?php
require_once 'vendor/autoload.php'; // Připojení JWT knihovny
require_once 'common.php';
use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));
// Získání POST dat
$email = $data->email;
$password = $data->password;

$db = new SQLite3('gamescribe.db');

// Vyhledání uživatele podle emailu
$userResult = $db->query("SELECT id, email, password FROM users WHERE email='$email'");

if (!$userResult) {
    // Pokud nastane chyba, vrátíme chybu 500
    http_response_code(500);
    die();
}

// Získání výsledku jako asociativní pole
$user = $userResult->fetchArray(SQLITE3_ASSOC);

if (!$user) {
    // Pokud uživatel neexistuje, vrátíme chybu 400 s vzkazem
    http_response_code(400);
    echo json_encode("Uživatel neexistuje");
    die();
}

if (!password_verify($password, $user['password'])) {
    // Pokud heslo není správné, vrátíme chybu 400 s vzkazem
    http_response_code(400);
    echo json_encode("Chybné heslo");
    die();
}

// Pokud se uživatel úspěšně přihlásil, vytvoříme JWT token
$jwtPayload = array(
    "id" => $user['id']
);

$jwt = JWT::encode($jwtPayload, JWT_KEY, 'HS256');

// Nastavení headerů a vrácení výsledku
header('Content-Type: application/json');
http_response_code(200);
echo json_encode($jwt);
