<?php
function getAllLocations($user) {
    $db = new SQLite3('gamescribe.db');

    $stmt = $db->prepare('SELECT * FROM locations WHERE project_id IN (select id from projects where user_id = :user_id)');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $locations = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $locations[] = $row;
    }

    $db->close();

    return $locations;
}
