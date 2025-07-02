<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';
$dataDir = __DIR__ . '/data/';
$dataFile = $dataDir . 'data.json';
$settingsFile = $dataDir . 'settings.json';
if (!file_exists($dataDir)) mkdir($dataDir,0777,true);
if ($action === 'load') {
    echo file_exists($dataFile) ? file_get_contents($dataFile) : json_encode([]);
}
elseif ($action === 'save') {
    $users = $data['users'] ?? [];
    if (!empty($users)) {
        file_put_contents($dataFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'message' => 'تم حفظ المستخدمين']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'لا توجد بيانات للحفظ']);
    }
}
elseif ($action === 'saveSettings') {
    $settings = $data['settings'] ?? [];
    file_put_contents($settingsFile, json_encode($settings, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['status' => 'success', 'message' => 'تم حفظ إعدادات الموقع']);
}
elseif ($action === 'loadSettings') {
    echo file_exists($settingsFile) ? file_get_contents($settingsFile) : json_encode([]);
}
else {
    echo json_encode(['status' => 'error', 'message' => 'إجراء غير معروف']);
}