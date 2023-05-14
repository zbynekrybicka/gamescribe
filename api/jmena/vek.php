<?php

$csv = file_get_contents('osoby.csv');

$rows = explode("\n", $csv);

$db = new SQLite3('../gamescribe.db');

foreach ($rows as $row) {
    if ($row) {
        list($id, , , $age) = explode(",", $row);
        $stmt = $db->prepare('UPDATE persons SET age = :age WHERE id = :id');
        $stmt->bindValue(':age', trim($age), SQLITE3_TEXT);
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
        $result = $stmt->execute();
        echo $id . " " . $age . "\n";
    }
}

$db->close();