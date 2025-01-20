<?php
require 'db.php'; // Incluye tu archivo de conexión a la base de datos

try {
    // Consulta simple para verificar la conexión
    $stmt = $pdo->query("SELECT 'Conexión exitosa' AS mensaje");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Respuesta en JSON
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => $result['mensaje']
    ]);
} catch (PDOException $e) {
    // En caso de error, responde con el mensaje de error
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
