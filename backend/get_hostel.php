<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "127.0.0.1";
$username = "u334077350_ecorestaz";
$password = "Admin1618!";
$dbname = "u334077350_ecorestaz";

// Veritabanı bağlantısı oluşturma
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// POST isteği olup olmadığını kontrol et
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstname = $_POST['firstname'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $xidmet_novleri = $_POST['xidmet_novleri'] ?? '';
    $rules = json_decode($_POST['rules'], true);

    // JSON decode hatası kontrolü
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON format for 'rules'"]);
        exit();
    }

    // Veritabanına veri ekleme
    if ($stmt = $conn->prepare("INSERT INTO users (firstname, email, phone, xidmet_novleri, rules) VALUES (?, ?, ?, ?, ?)")) {
        $rules_json = json_encode($rules); // 'rules' dizisini tekrar JSON'a dönüştürüyoruz
        $stmt->bind_param("sssss", $firstname, $email, $phone, $xidmet_novleri, $rules_json);
        $stmt->execute();
        $stmt->close();
        echo json_encode(["success" => true, "message" => "Data successfully saved"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database insert failed"]);
    }
} else {
    // GET isteği için mevcut kod
    $sql = "SELECT id, name, location, price, image_url, product_detail, product_name FROM hostels";  // Sadece gerekli alanları seçiyoruz
    $result = $conn->query($sql);

    $hostels = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            // image_url alanını JSON formatından diziye dönüştürüyoruz
            $image_urls = json_decode($row['image_url'], true);
            
            if (json_last_error() === JSON_ERROR_NONE && is_array($image_urls)) {
                // Her bir resim için tam URL oluşturuyoruz
                $image_urls = array_map(function($image) {
                    return "https://ecorest.az/backend/" . $image;
                }, $image_urls);
            } else {
                $image_urls = []; // Hata durumunda boş bir dizi
            }

            $row['image_url'] = $image_urls; // Güncellenmiş resim URL'lerini satıra ekliyoruz
            $hostels[] = $row;
        }
        echo json_encode($hostels);
    } else {
        echo json_encode(["status" => "error", "message" => "No hostels found"]);
    }
}

// Veritabanı bağlantısını kapatma
$conn->close();
?>
