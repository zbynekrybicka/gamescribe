<?php

$db = new SQLite3('../gamescribe.db');
$stmt = $db->prepare('select id, location_id, firstname, lastname from persons where age = "young"');
$result = $stmt->execute();

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $stmt = $db->prepare('select id, firstname, lastname, gender from persons where age = "middle" and location_id = :location_id');
    $stmt->bindValue(':location_id', $row['location_id'], SQLITE3_INTEGER);
    $res = $stmt->execute();
    $parents = [];
    while ($r = $res->fetchArray(SQLITE3_ASSOC)) {
        $parents[] = $r;
    }
    if (count($parents) == 2) {
        $mother_id = $parents[0]['gender'] === "f" ? $parents[0]['id'] : $parents[1]['id'];
        $father_id = $parents[0]['gender'] === "m" ? $parents[0]['id'] : $parents[1]['id'];
        $stmt = $db->prepare('update persons set mother_id = :mother_id, father_id = :father_id where id = :id');
        $stmt->bindValue(':mother_id', $mother_id, SQLITE3_INTEGER);
        $stmt->bindValue(':father_id', $father_id, SQLITE3_INTEGER);
        $stmt->bindValue(':id', $row['id'], SQLITE3_INTEGER);
        $stmt->execute();
        echo "{$row['firstname']} {$row['lastname']}\n";
    }
    
}