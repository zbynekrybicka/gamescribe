<?php

$db = new SQLite3('../gamescribe.db');
$stmt = $db->prepare('SELECT id, habitability FROM locations WHERE property = 1 and NOT id IN (select location_id from persons where location_id is not null)');
$result = $stmt->execute();

$output = array();
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $output[] = array(
        'id' => $row['id'],
        'habitability' => $row['habitability']
    );
}

echo json_encode($output);
$db->close();
