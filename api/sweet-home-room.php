<?php
require_once 'common.php';

if (!($user = checkAuth())) {
    http_response_code(401);
    echo json_encode("Požadavek nebyl autorizován.");
    exit;
}

function prepocitejAbsolutniPudorys($pudorysDomu, $pudorysPokoje, $obracene) {
    $xArr = array_map(function($souradnice) {
        return $souradnice[0];
    }, $pudorysDomu);
    $yArr = array_map(function($souradnice) {
        return $souradnice[1];
    }, $pudorysDomu);
    $min_x = min($xArr);
    $max_x = max($xArr);
    $min_y = min($yArr);
    $max_y = max($yArr);
    $absolutniPudorys = [];
    foreach ($pudorysPokoje as $souradnice) {
        if ($obracene) {
            $x = $max_x - $souradnice[0];
            $y = $min_y + $souradnice[1];
        } else {
            $x = $min_x + $souradnice[0];
            $y = $max_y - $souradnice[1];
        }
        $absolutniPudorys[] = [$x, $y];
    }
    return $absolutniPudorys;
}

$db = new Dibi\Connection([
    "driver" => "sqlite",
    "database" => './gamescribe.db'
]);
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pudorysDomu = $db->select('pudorys')->from('locations')->where('id = %u', $data['dum'])->fetchSingle();
    $pudorysPokoje = prepocitejAbsolutniPudorys(json_decode($pudorysDomu), $data['pudorys'], $data['obracene']);
    $db->update('locations', ['pudorys' => json_encode($pudorysPokoje)])->where('id = %u', $data['location_id'])->execute();
    echo json_encode($pudorysPokoje);
}