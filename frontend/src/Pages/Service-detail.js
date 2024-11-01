import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/Service_detail.css";
import { useLanguage } from "../LanguageContext";

function Service_detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [muracietTarixi, setMuracietTarixi] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product_name, setProductname] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const partialPhone = product ? `${product.phone.slice(0, 4)}xxx` : ""; // Telefon numarasının sadece ilk kısmı

  // Tıklamayla numarayı gizle/göster
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  useEffect(() => {
    let apiUrl = "";

    if (window.location.pathname.includes("hostels/")) {
      apiUrl = `https://ecorest.az/backend/get_hostel_detail.php?id=${id}`;
      setServiceType("hostels");
    } else if (window.location.pathname.includes("kitchen/")) {
      apiUrl = `https://ecorest.az/backend/get_kitchen_detail.php?id=${id}`;
      setServiceType("kitchen");
    } else if (window.location.pathname.includes("organicpro/")) {
      apiUrl = `https://ecorest.az/backend/get_organic_detail.php?id=${id}`;
      setServiceType("organicpro");
    } else if (window.location.pathname.includes("events/")) {
      apiUrl = `https://ecorest.az/backend/get_event_detail.php?id=${id}`;
      setServiceType("events");
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const productData = data.data || data; // 'data.data' varsa onu kullan, yoksa doğrudan 'data' kullan
        setProduct(productData);
      })
      .catch((error) =>
        console.error(
          language === "az"
            ? "Məhsul yüklənə bilmədi:"
            : "Failed to load product:",
          error
        )
      );
  }, [id, language]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleOrder = () => {
    const token = localStorage.getItem("token");

    // Eğer token yoksa login sayfasına yönlendir
    if (!token) {
      alert(
        language === "az"
          ? "Sifariş vermək üçün əvvəlcə giriş edin."
          : "Please login before placing an order."
      );
      navigate("/login");
      return; // Login'e yönlendirdikten sonra fonksiyonu sonlandır
    }

    const orderData = {
      name,
      email,
      phone,
      serviceType,
      productId: id,
      quantity,
      muracietTarixi: muracietTarixi
        ? new Date(muracietTarixi).toISOString().split("T")[0]
        : null,
      product_name,
    };

    fetch("https://ecorest.az/backend/place_order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(
            language === "az"
              ? "Sifarişiniz uğurla əlavə edildi"
              : "Your order has been successfully added"
          );
          navigate("/approve", {
            state: { productData: product, orderData: orderData },
          });
        } else {
          alert(
            language === "az"
              ? "Sifariş uğursuz oldu: " + data.message
              : "Order failed: " + data.message
          );
        }
      })
      .catch((error) =>
        console.error(
          language === "az" ? "Sifariş uğursuz oldu:" : "Order failed:",
          error
        )
      );
  };
  if (!product) {
    return <div>{language === "az" ? "Yüklənir..." : "Loading..."}</div>;
  }

  return (
    <div className="service-description">
      <div className="left-order">
        <h2>
          {serviceType === "hostels"
            ? language === "az"
              ? "Müraciət tarixi"
              : "Application Date"
            : language === "az"
            ? "Məhsul sifarişi"
            : "Product Order"}
        </h2>
        {serviceType === "hostels" ? (
          <div className="step1">
            <h2>
              {language === "az" ? "Müraciət tarixi:" : "Application Date:"}
            </h2>
            <input
              type="date"
              value={muracietTarixi}
              onChange={(e) => setMuracietTarixi(e.target.value)}
            />
          </div>
        ) : (
          <div className="step1">
            <p>{language === "az" ? "Məhsul sayı" : "Product Quantity"}</p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        )}
        <div className="step2">
          <h2>
            {language === "az"
              ? "Şəxsi məlumatlarınız"
              : "Your Personal Information"}
          </h2>
          <label>
            {language === "az" ? "Adınız, Soyadınız" : "First Name, Last Name"}
          </label>
          <input
            type="text"
            placeholder={
              language === "az" ? "Adınız soyadınız" : "Your name and surname"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>
            {language === "az" ? "Email adresiniz" : "Your Email Address"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            {language === "az" ? "Telefon nömrəniz" : "Your Phone Number"}
          </label>
          <input
            type="tel"
            placeholder={language === "az" ? "000 000 000" : "000 000 000"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {product && (
          <div className="step3">
            <h2>
              {language === "az" ? "Satıcı ilə əlaqə" : "Contact with Seller"}
            </h2>
            <p>{language === "az" ? "Əlaqə nömrəsi" : "Contact Number"}</p>
            <p onClick={handleToggle} className="phone-number">
              {isVisible ? product.phone : partialPhone}
            </p>
            <p>
              {language === "az" ? "Satıcının adı" : "Seller's Name"}:{" "}
              <b>{product.name}</b>
            </p>
            <p>{language === "az" ? "Məhsul adı" : "Product Name"}</p>
            <p>
              <b>{product.product_name}</b>
            </p>
            <p>
              {language === "az"
                ? "Məhsul haqqında qeyd"
                : "Product Description"}
            </p>
            <p>
              <i>{product.product_detail}</i>
            </p>
          </div>
        )}
      </div>
      <div className="order-description">
        <div className="order-main">
          <img src={product.image_url} alt={product.name} />
          <h2>{product.product_name}</h2>
          <p className="order-location">{product.location}</p>
          {serviceType === "hostels" && (
            <div className="date-order">
              <p>
                {language === "az" ? "Müraciət tarixi:" : "Application Date:"}{" "}
                <span>{muracietTarixi}</span>
              </p>
            </div>
          )}
          <div className="click-order">
            <button type="button" onClick={handleOrder}>
              {language === "az" ? "Sifariş edin" : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service_detail;
