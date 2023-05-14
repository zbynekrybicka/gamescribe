<?php
require_once 'common.php';

if (!($user = checkAuth())) {
    http_response_code(401);
    echo json_encode("Požadavek nebyl autorizován.");
    exit;
}

$db = new SQLite3('gamescribe.db');

// zpracovani POST requestu pro vytvoreni noveho projektu
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $title = $db->escapeString($data['title']);
    $description = $db->escapeString($data['description']);

    $stmt = $db->prepare('INSERT INTO projects (user_id, title, description) VALUES (:user_id, :title, :description)');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->bindValue(':title', $title, SQLITE3_TEXT);
    $stmt->bindValue(':description', $description, SQLITE3_TEXT);
    $result = $stmt->execute();

    if ($result) {
        $data['id'] = $db->lastInsertRowID();
        echo json_encode($data);
    } else {
        http_response_code(500);
        echo json_encode("Chyba při vytváření projektu.");
    }

// zpracovani PUT requestu pro editaci projektu
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $title = $db->escapeString($data['title']);
    $description = $db->escapeString($data['description']);

    $stmt = $db->prepare('UPDATE projects SET title = :title, description = :description WHERE id = :id AND user_id = :user_id');
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->bindValue(':title', $title, SQLITE3_TEXT);
    $stmt->bindValue(':description', $description, SQLITE3_TEXT);
    $result = $stmt->execute();

    if ($result && $db->changes() > 0) {
        http_response_code(204);
    } else {
        http_response_code(500);
        echo json_encode("Chyba při ukládání projektu.");
    }
}

$db->close();
