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
    // Attempt to prepare and execute the INSERT statement
    try {
        $stmt = $db->prepare('INSERT INTO locations (name, description, parent_id, project_id, habitability, property) VALUES (:name, :description, :parent_id, :project_id, :habitability, :property)');
        $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
        $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
        $stmt->bindValue(':parent_id', $data['parent_id'], SQLITE3_INTEGER);
        $stmt->bindValue(':project_id', $data['project_id'], SQLITE3_INTEGER);
        $stmt->bindValue(':property', $data['property'] ?? 0, SQLITE3_INTEGER);
        if (isset($data['habitability'])) {
            $stmt->bindValue(':habitability', $data['habitability'], SQLITE3_TEXT);
        } else {
            $stmt->bindValue(':habitability', '', SQLITE3_NULL);
        }
        $stmt->execute();
        $data['id'] = $db->lastInsertRowID();
        http_response_code(201);
        echo json_encode($data);
    } catch (Exception $e) {
        // Handle any exceptions that are thrown when executing the INSERT statement
        http_response_code(500);
        echo json_encode(array('error' => $e->getMessage()));
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $stmt = $db->prepare('UPDATE locations SET 
        name=:name, 
        description=:description, 
        habitability=:habitability, 
        property=:property, 
        pudorys=:pudorys, 
        barva=:barva, 
        popisek=:popisek 
    WHERE id=:id AND project_id IN (select id from projects where user_id=:user_id)');
    $stmt->bindValue(':name', $data['name'], SQLITE3_TEXT);
    $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
    $stmt->bindValue(':id', $data['id'], SQLITE3_INTEGER);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->bindValue(':property', $data['property'] ?? 0, SQLITE3_INTEGER);
    $stmt->bindValue(':pudorys', $data['pudorys'], SQLITE3_TEXT);
    $stmt->bindValue(':barva', $data['barva'], SQLITE3_TEXT);
    $stmt->bindValue(':popisek', $data['popisek'], SQLITE3_TEXT);
    if (isset($data['habitability'])) {
        $stmt->bindValue(':habitability', $data['habitability'], SQLITE3_TEXT);
    } else {
        $stmt->bindValue(':habitability', '', SQLITE3_NULL);
    }
    $stmt->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $stmt = $db->prepare('DELETE FROM locations WHERE id=:id AND project_id IN (select id from projects where user_id=:user_id)');
    $stmt->bindValue(':id', $_GET['id'], SQLITE3_INTEGER);
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
}


$db->close();
