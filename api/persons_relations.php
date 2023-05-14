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
    $stmt = $db->prepare('SELECT id FROM persons WHERE trim(firstname || " " || lastname) = :fullname');
    $stmt->bindValue(':fullname', $data['relativePerson'], SQLITE3_TEXT);
    $result = $stmt->execute();
    $row = $result->fetchArray(SQLITE3_ASSOC);
    if (!$row) {
        http_response_code(400);
        echo json_encode("Osoba neexistuje");
        exit;
    }
    $person2id = $row['id'];

    $stmt = $db->prepare('INSERT INTO persons_relations (person1_id, person2_id, description) VALUES (:person1_id, :person2_id, :description)');
    $stmt->bindValue(':person1_id', $data['person_id'], SQLITE3_INTEGER);
    $stmt->bindValue(':person2_id', $person2id, SQLITE3_INTEGER);
    $stmt->bindValue(':description', '', SQLITE3_TEXT);
    $stmt->execute();    
    $result = [ 
        'id' => $db->lastInsertRowID(),
        'person1_id' => $data['person_id'],
        'person2_id' => $person2id,
        'description' => ''
    ];
    http_response_code(201);
    echo json_encode($result);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $stmt = $db->prepare('UPDATE persons_relations SET description=:description WHERE id=:id');
    $stmt->bindValue(':description', $data['description'], SQLITE3_TEXT);
    $stmt->bindValue(':id', $data['id'], SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $stmt = $db->prepare('DELETE FROM persons_relations WHERE id=:id');
    $stmt->bindValue(':id', $_GET['id'], SQLITE3_INTEGER);
    $stmt->execute();
    http_response_code(204);
}

$db->close();
