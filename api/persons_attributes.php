<?php
require_once 'common.php';

if (!($user = checkAuth())) {
    http_response_code(401);
    echo json_encode("Požadavek nebyl autorizován.");
    exit;
}

$db = new SQLite3('gamescribe.db');
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $db->prepare('INSERT INTO persons_attributes (person_id, attribute) VALUES (:person_id, :attribute)');
    $stmt->bindValue(':person_id', $data['person_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':attribute', $data['attribute'], SQLITE3_TEXT);
    $stmt->execute();
    http_response_code(201);
    $data['value'] = 1;
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $stmt = $db->prepare('UPDATE persons_attributes set value = :value WHERE person_id = :person_id AND attribute = :attribute');    
    $stmt->bindValue(':person_id', $data['person_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':attribute', $data['attribute'], SQLITE3_TEXT);
    $stmt->bindValue(':value', $data['value'], SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    list($person_id, $attribute) = explode("-", $_GET['id']);
    $stmt = $db->prepare('DELETE FROM persons_attributes WHERE person_id = :person_id AND attribute = :attribute');    
    $stmt->bindValue(':person_id', $person_id, SQLITE3_INTEGER);
    $stmt->bindValue(':attribute', $attribute, SQLITE3_TEXT);
    $stmt->execute();
    http_response_code(204);
}

$db->close();
