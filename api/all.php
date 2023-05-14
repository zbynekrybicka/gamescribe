<?php
require_once 'common.php';

require 'getAll/projects.php';
require 'getAll/locations.php';
require 'getAll/npcs.php';
require 'getAll/items.php';
require 'getAll/cutScenes.php';
require 'getAll/cutScenesCharacters.php';
require 'getAll/cutScenesLines.php';
require 'getAll/personTags.php';
require 'getAll/personAttributes.php';
require 'getAll/personsRelations.php';
// ...

if (!($user = checkAuth())) {
    http_response_code(401);
    echo json_encode("Požadavek nebyl autorizován.");
    exit;
}


$data = [
    'projects' => getAllProjects($user),
    'locations' => getAllLocations($user),
    'npcs' => getAllNpcs($user),
    'items' => getAllItems($user),
    'cutScenes' => getAllCutScenes($user),
    'cutScenesCharacters' => getAllCutScenesCharacters($user),
    'cutScenesLines' => getAllCutScenesLines($user),
    'person_tags' => getAllPersonTags($user),
    'person_attributes' => getAllPersonAttributes($user),
    'persons_relations' => getAllPersonsRelations($user),
    // ...
];

header('Content-Type: application/json');
echo json_encode($data);
