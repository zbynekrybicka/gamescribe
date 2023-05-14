<?php
// otevření SQLite databáze
$db = new SQLite3('mereni.db');

// provedení SQL dotazu
$results = $db->query('SELECT nazev, popis, rozmer FROM domy INNER JOIN rozmery ON domy.id = rozmery.dum_id ORDER BY nazev');

// přeměna výsledků na pole
$data = array();
while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    $nazev = $row['nazev'];
    $popis = $row['popis'];
    $rozmer = $row['rozmer'];

    if (!isset($data[$nazev])) {
        $data[$nazev] = array();
    }
    $data[$nazev][] = array('popis' => $popis, 'rozmer' => $rozmer);
}

// uzavření databáze
$db->close();

// Získání seznamu názvů sloupců
// Vytvoření tabulky
echo '<table>';

$existujiciPolozky = [];

// Hlavička tabulky
foreach ($data as $column => $polozky) {
  echo $column . ',';
  foreach ($polozky as $polozka) {
    if (!array_key_exists($polozka['popis'], $existujiciPolozky)) {        
        $existujiciPolozky[$polozka['popis']] = [];
        foreach (array_keys($data) as $dum) {
            $existujiciPolozky[$polozka['popis']][$dum] = "";
        }
    }
    $existujiciPolozky[$polozka['popis']][$column] = $polozka['rozmer'];
  }
}
echo "\n";
foreach ($existujiciPolozky as $popis => $domy) {
  echo $popis . ',';
  foreach ($domy as $dum) {
    echo $dum . ',';
  }
  echo "\n";
}