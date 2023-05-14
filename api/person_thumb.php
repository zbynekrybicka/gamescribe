<?php 
// cesta k původnímu souboru a nové šířce a výšce
$filename = 'persons/' . intval($_GET['id']) . '.jpg';
$newWidth = 100;
$newHeight = 100;

if (function_exists('imagecreatefromjpeg')) {
    // načtení obrázku pomocí funkce imagecreatefromjpeg
    $sourceImg = imagecreatefromjpeg($filename);

    // získání původních rozměrů obrázku
    $width = imagesx($sourceImg);
    $height = imagesy($sourceImg);

    // výpočet poměru zmenšení
    $ratio = min($newWidth/$width, $newHeight/$height);

    // výpočet nových rozměrů
    $newWidth = intval($ratio*$width);
    $newHeight = intval($ratio*$height);

    // vytvoření prázdného obrázku nových rozměrů
    $newImg = imagecreatetruecolor($newWidth, $newHeight);

    // zmenšení původního obrázku a jeho uložení do nového obrázku
    imagecopyresampled($newImg, $sourceImg, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    // výstup nového obrázku v JPEG formátu
    header('Content-Type: image/jpeg');
    imagejpeg($newImg);

    // uvolnění zdrojového a nového obrázku z paměti
    imagedestroy($sourceImg);
    imagedestroy($newImg);

} else {
    // výstup nového obrázku v JPEG formátu
    header('Content-Type: image/jpeg');
    echo file_get_contents($filename);
}