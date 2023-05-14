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
    $stmt = $db->prepare('INSERT INTO cut_scene_lines (cut_scene_id, character_id, line_text, note) VALUES (:cut_scene_id, :character_id, :line_text, :note)');
    $stmt->bindValue(':cut_scene_id', $data['cut_scene_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':character_id', $data['character_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':line_text', $data['line_text'], SQLITE3_TEXT);
    $stmt->bindValue(':note', $data['note'], SQLITE3_TEXT);
    $stmt->execute();
    $data['id'] = $db->lastInsertRowID();
    http_response_code(201);
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $stmt = $db->prepare('UPDATE cut_scene_lines SET character_id=:character_id, line_text=:line_text, note=:note WHERE id=:id AND cut_scene_id IN (select id from cut_scenes where location_id IN (select id from locations where project_id IN (select id from projects where user_id = :user_id)))');
    $stmt->bindValue(':id', $data['id'], SQLITE3_INTEGER);
    $stmt->bindValue(':character_id', $data['character_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':line_text', $data['line_text'], SQLITE3_TEXT);
    $stmt->bindValue(':note', $data['note'], SQLITE3_TEXT);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $stmt = $db->prepare('DELETE FROM cut_scene_lines WHERE id=:id AND cut_scene_id IN (select id from cut_scenes where location_id IN (select id from locations where project_id IN (select id from projects where user_id = :user_id)))');
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
}

$db->close();
