<?php
function getAllCutScenesLines($user) {
    $db = new SQLite3('gamescribe.db');

    $stmt = $db->prepare('SELECT * FROM cut_scene_lines WHERE cut_scene_id IN (select id from cut_scenes where location_id IN (select id from locations where project_id IN (select id from projects where user_id = :user_id)))');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $cutScenes = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $cutScenes[] = $row;
    }

    $db->close();

    return $cutScenes;
}
