<?php
function getAllPersonAttributes($user) {
    $db = new SQLite3('gamescribe.db');

    $stmt = $db->prepare('SELECT * FROM persons_attributes WHERE person_id IN (select id from persons WHERE project_id IN (select id from projects where user_id = :user_id))');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $npcs = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $npcs[] = $row;
    }

    $db->close();

    return $npcs;
}
