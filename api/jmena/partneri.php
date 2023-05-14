<?php

$db = new SQLite3('../gamescribe.db');
$stmt = $db->prepare('select id, location_id, firstname, lastname from persons where age = "middle" and gender = "f"');
$result = $stmt->execute();

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $stmt = $db->prepare('select id from persons where age = "middle" and gender = "m" and location_id = :location_id');
    $stmt->bindValue(':location_id', $row['location_id'], SQLITE3_INTEGER);
    $res = $stmt->execute();    
    if ($r = $res->fetchArray(SQLITE3_ASSOC)) {
        echo "{$row['firstname']} {$row['lastname']}\n";
        $stmt = $db->prepare('update persons set partner_id = :partner_id where id = :id');
        $stmt->bindValue(':partner_id', $r['id'], SQLITE3_INTEGER);
        $stmt->bindValue(':id', $row['id'], SQLITE3_INTEGER);
        $stmt->execute();        
    }
}