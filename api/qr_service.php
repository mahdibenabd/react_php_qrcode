<?php
require '../phpqrcode/qrlib.php';

// Set appropriate headers for cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['text']) || empty($data['text'])) {
        echo json_encode(['success' => false, 'message' => 'Le texte à encoder est requis.']);
        exit;
    }

    $text = $data['text'];
    $qrTempDir = __DIR__ . '/qr_codes';
    $fileName = uniqid() . '.png';
    $filePath = $qrTempDir . '/' . $fileName;

    if (!is_dir($qrTempDir)) {
        if (!mkdir($qrTempDir, 0777, true)) {
            echo json_encode(['success' => false, 'message' => 'Le dossier de QR codes n\'existe pas et ne peut pas être créé.']);
            exit;
        }
    }

    if (!is_writable($qrTempDir)) {
        echo json_encode(['success' => false, 'message' => 'Le dossier de QR codes n\'est pas inscriptible.']);
        exit;
    }

    try {
        ob_start(); 
        QRcode::png($text, $filePath);
        $qrImage = ob_get_clean();
        $base64Image = base64_encode(file_get_contents($filePath));
        echo json_encode(['success' => true, 'qr_code_url' => "http://localhost/api/qr_codes/$fileName"]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>
