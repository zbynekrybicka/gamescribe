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
    $stmt = $db->prepare('INSERT INTO person_tags (person_id, tag) VALUES (:person_id, :tag)');
    $stmt->bindValue(':person_id', $data['person_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':tag', $data['tag'], SQLITE3_TEXT);
    $stmt->execute();
    http_response_code(201);
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    list($person_id, $tag) = explode("-", $_GET['id']);
    $stmt = $db->prepare('DELETE FROM person_tags WHERE person_id = :person_id AND tag = :tag');    
    $stmt->bindValue(':person_id', $person_id, SQLITE3_INTEGER);
    $stmt->bindValue(':tag', $tag, SQLITE3_TEXT);
    $stmt->execute();
    http_response_code(204);
}

$db->close();
