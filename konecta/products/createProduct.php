<?php
header('Access-Control-Allow-Origin: *');
include_once "./cors.php";
$product = json_decode(file_get_contents("php://input"));
include_once "./funciones.php";
$response = createProduct($product);
echo json_encode($response);
