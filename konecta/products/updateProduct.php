<?php
header('Content-Type: application/json');
include_once "./cors.php";
$product = json_decode(file_get_contents("php://input"));
include_once "./funciones.php";
$response = updateProduct($product);
echo json_encode($response);
