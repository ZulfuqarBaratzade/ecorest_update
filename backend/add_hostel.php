<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "127.0.0.1";
$username = "u334077350_ecorestaz";
$password = "Admin1618!";
$dbname = "u334077350_ecorestaz";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Bağlantı uğursuz oldu: " . $conn->connect_error]));
}

$name = $_POST['name'] ?? null;
$location = $_POST['location'] ?? null;
$price = $_POST['price'] ?? null;
$images = $_FILES['image'] ?? null;
$phone = $_POST['phone'] ?? null;
$product_detail = $_POST['product_detail'] ?? null;

if (!$name || !$location || !$price || !$images || !$phone || !$product_detail) {
    echo json_encode(["status" => "error", "message" => "Bütün sahələr doldurulmalıdır"]);
    exit();
}

// Şəkil yükləmə prosesi
$image_urls = [];
$target_dir = "images/hostels/";

for ($i = 0; $i < count($images['name']); $i++) {
    $target_file = $target_dir . basename($images["name"][$i]);
    if (move_uploaded_file($images["tmp_name"][$i], $target_file)) {
        $image_urls[] = $target_file;
    } else {
        echo json_encode(["status" => "error", "message" => "Şəkil yüklənərkən xəta baş verdi"]);
        exit();
    }
}

// Resim URL'lerini JSON formatında sakla
$image_urls_json = json_encode($image_urls);

// Veritabanına veri ekleme
$sql = "INSERT INTO hostels (name, location, price, image_url, phone, product_detail) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "SQL hazırlığı uğursuz oldu: " . $conn->error]);
    exit();
}

$stmt->bind_param("ssdsss", $name, $location, $price, $image_urls_json, $phone, $product_detail);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Hostel uğurla əlavə edildi"]);
} else {
    echo json_encode(["status" => "error", "message" => "Hostel əlavə edilərkən xəta baş verdi"]);
}

$stmt->close();
$conn->close();
?>
