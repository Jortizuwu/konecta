<?php
header('Content-Type: application/json'); 
include_once "cors.php";
include_once './funciones.php';
$products = getSales();
echo json_encode($products);
