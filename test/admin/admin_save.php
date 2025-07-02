<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';
$section = $data['section'] ?? '';
$sectionData = $data['data'] ?? [];

$dataFile = 'admin_data.json';
$currentData = [];

if (file_exists($dataFile)) {
    $currentData = json_decode(file_get_contents($dataFile), true) ?: [];
}

if ($action === 'save') {
    $currentData[$section] = $sectionData;
    file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['status' => 'success', 'message' => 'تم حفظ البيانات بنجاح']);
} 
elseif ($action === 'load') {
    echo json_encode($currentData);
}
else {
    echo json_encode(['status' => 'error', 'message' => 'إجراء غير معروف']);
}
?>