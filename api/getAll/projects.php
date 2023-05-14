<?php
function getAllProjects($user) {
    $db = new SQLite3('gamescribe.db');

    $stmt = $db->prepare('SELECT * FROM projects WHERE user_id = :user_id');
    $stmt->bindValue(':user_id', $user->id, SQLITE3_INTEGER);
    $result = $stmt->execute();

    $projects = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $projects[] = $row;
    }

    $db->close();

    return $projects;
}