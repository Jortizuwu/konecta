<?php
header('Access-Control-Allow-Origin: *');
include_once "./cors.php";
$sale = json_decode(file_get_contents("php://input"));
include_once "./funciones.php";
$response = createSale($sale);
echo json_encode($response);
