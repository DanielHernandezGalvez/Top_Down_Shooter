<?php
$host = 'localhost';
$dbname = 'u815742781_db';
$username = 'u815742781_dmin';
$password = 'fX4J3PBtPC;7';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>