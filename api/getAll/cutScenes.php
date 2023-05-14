<?php
function getAllCutScenes($user) {
    $db = new SQLite3('gamescribe.db');

    $stmt = $db->prepare('SELECT * FROM cut_scenes WHERE location_id IN (select id from locations where project_id IN (select id from projects where user_id = :user_id))');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $cutScenes = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $cutScenes[] = $row;
    }

    $db->close();

    return $cutScenes;
}
