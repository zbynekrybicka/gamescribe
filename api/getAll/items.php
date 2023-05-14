<?php
function getAllItems($user) {
    $db = new SQLite3('gamescribe.db');

    $stmt = $db->prepare('SELECT * FROM items WHERE project_id IN (select id from projects where user_id = :user_id)');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $items = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $items[] = $row;
    }

    $db->close();

    return $items;
}
