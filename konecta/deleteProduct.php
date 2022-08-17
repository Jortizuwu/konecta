<?php
header('Content-Type: application/json'); 
include_once "./cors.php";
if (!isset($_GET["id_product"])) {
    echo json_encode(null);
    exit;
}
$id_product = $_GET["id_product"];
include_once "./funciones.php";
$ok = deleteProduct($id_product);
echo json_encode($ok);

