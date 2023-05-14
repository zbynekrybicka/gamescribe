<?php
require_once 'common.php';

if (!($user = checkAuth())) {
    http_response_code(401);
    echo json_encode("Požadavek nebyl autorizován.");
    exit;

$db = new SQLite3('gamescribe.db');
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $db->prepare('INSERT INTO items (name, description,project_id) VALUES (:name, :description, :project_id)');
    $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
    $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
    $stmt->bindValue(':project_id', $data['project_id'], SQLITE3_INTEGER);
    $stmt->execute();
    $data['id'] = $db->lastInsertRowID();
    http_response_code(201);
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $stmt = $db->prepare('UPDATE items SET name=:name, description=:description WHERE id=:id AND project_id IN (select id from projects where user_id=:user_id)');
    $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
    $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
    $stmt->bindValue(':id', $data['id'], SQLITE3_INTEGER);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $stmt = $db->prepare('DELETE FROM items WHERE id=:id AND project_id IN (select id from projects where user_id=:user_id)');
    $stmt->bindValue(':id', $_GET['id'], SQLITE3_INTEGER);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
}

$db->close();
