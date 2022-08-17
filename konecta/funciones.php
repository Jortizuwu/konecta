<?php

// products 

function deleteProduct($id_product)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("DELETE FROM product WHERE id_product = ?");
    return $sentencia->execute([$id_product]);
}

function updateProduct($product)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("UPDATE product SET name = ?, reference = ?, price = ?, weight = ?, category = ?, stock = ?, creation_date = ? WHERE id_product = ?");
    return $sentencia->execute([$product->name, $product->reference, $product->price, $product->weight, $product-> category, $product->stock, $product->creation_date ,$product->id_product]);
}

function getProductById($id_product)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("SELECT id_product, name, reference , price , weight, category, stock, creation_date FROM product WHERE id_product = ?");
    $sentencia->execute([$id_product]);
    return $sentencia->fetchObject();
}

function getProducts()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT id_product, name, reference ,price , weight, category, stock, creation_date FROM product");
    return $sentencia->fetchAll();
}

function createProduct($product)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO product(name, reference ,price , weight, category, stock, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?");
    return $sentencia->execute([$product->name, $product->reference, $product->price, $product->weight, $product-> category, $product->stock, $product->creation_date ]);
}


// sales

function getSales()
{
    $bd = obtenerConexion();
    $sentencia = $bd->query("SELECT id_sale, id_product, quantity FROM sale");
    return $sentencia->fetchAll();
}

function createSale($sale)
{
    $bd = obtenerConexion();
    $sentencia = $bd->prepare("INSERT INTO sale(id_product, quantity) VALUES (?, ?");
    return $sentencia->execute([$sale->id_product, $sale->quantity]);
}

// setup

function obtenerVariableDelEntorno($key)
{
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}
function obtenerConexion()
{
    $password = obtenerVariableDelEntorno("MYSQL_PASSWORD");
    $user = obtenerVariableDelEntorno("MYSQL_USER");
    $dbName = obtenerVariableDelEntorno("MYSQL_DATABASE_NAME");
    $database = new PDO('mysql:host=localhost;dbname=' . $dbName, $user, $password);
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
}
