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
    $stmt = $db->prepare('INSERT INTO cut_scene_characters (cut_scene_id, person_id) VALUES (:cut_scene_id, :person_id)');
    $stmt->bindValue(':cut_scene_id', $data['cut_scene_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':person_id', $data['person_id'], SQLITE3_INTEGER);
    $stmt->execute();
    $data['id'] = $db->lastInsertRowID();
    http_response_code(201);
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $ids = explode('-', $_GET['id']);
    $stmt = $db->prepare('DELETE FROM cut_scene_characters WHERE cut_scene_id=:cut_scene_id AND person_id=:person_id');
    $stmt->bindValue(':cut_scene_id', $ids[0], SQLITE3_INTEGER);
    $stmt->bindValue(':person_id', $ids[1], SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
}

$db->close();
