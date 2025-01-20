<?php
require 'db.php'; // Conexión a la base de datos

try {
    // Consulta para obtener los usuarios
    $stmt = $pdo->query("SELECT id, nombre, email, created_at FROM usuarios");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'data' => $usuarios
    ]);
} catch (PDOException $e) {
    // Manejo de errores
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
