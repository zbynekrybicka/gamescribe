<?php

$db = new SQLite3('../gamescribe.db');
$stmt = $db->prepare('select id, firstname, lastname, gender, age from persons');
$result = $stmt->execute();

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $id = $row['id'];
    if (!file_exists("../persons/$id.jpg")) {
        echo "$id {$row['firstname']} {$row['lastname']} {$row['age']} {$row['gender']}\n";
        $stmt = $db->prepare('select id from unreal_person where age = :age and gender = :gender and used = 0 order by random() limit 1');
        $stmt->bindValue(':age', $row['age'], SQLITE3_TEXT);
        $stmt->bindValue(':gender', $row['gender'], SQLITE3_TEXT);
        $res = $stmt->execute();
        $upRow = $res->fetchArray(SQLITE3_ASSOC);
        if (!$upRow) {
            throw new \Exception("Chybí fotka pro daný věk a pohlaví.");
        }
        $stmt = $db->prepare('update unreal_person set used = 1 where id = :id');
        $stmt->bindValue(':id', $upRow['id'], SQLITE3_INTEGER);
        $stmt->execute();
        copy("../photos/{$upRow['id']}.jpg", "../persons/$id.jpg");
    }
    
}

