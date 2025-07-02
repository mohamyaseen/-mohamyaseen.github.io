<?php
// تفعيل تسجيل الأخطاء
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// إنشاء ملف log للأخطاء
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/admin_errors.log');
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';
$section = $data['section'] ?? '';
$sectionData = $data['data'] ?? [];

$dataFile = __DIR__ . '/admin_data.json';
$currentData = [];

if (file_exists($dataFile)) {
    $currentData = json_decode(file_get_contents($dataFile), true) ?: [];
}

if ($action === 'save') {
    // حفظ البيانات في القسم المحدد
    $currentData[$section] = $sectionData;
    
    // محاولة الحفظ مع التعامل مع الأخطاء
    if (file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['status' => 'success', 'message' => 'تم حفظ البيانات بنجاح']);
    } else {
        // تسجيل الخطأ في ملف log
        error_log('فشل في حفظ البيانات في: ' . $dataFile);
        echo json_encode(['status' => 'error', 'message' => 'فشل في حفظ البيانات']);
    }
} 
elseif ($action === 'load') {
    echo json_encode($currentData);
}
else {
    echo json_encode(['status' => 'error', 'message' => 'إجراء غير معروف']);
}
?>