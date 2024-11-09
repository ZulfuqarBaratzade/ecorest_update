import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import { useLanguage } from '../LanguageContext'; 
import organicImg from '../images/organic.avif'
function OrganicPro() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [organicItems, setOrganicItems] = useState([]); 
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Organik ürünler için veri çekme
    fetch('https://ecorest.az/backend/get_organic_items.php')
      .then(response => response.json())
      .then(data => setOrganicItems(data))
      .catch(error => console.error(language === 'az' ? "Verilər yüklənmədi:" : "Failed to load data:", error));
    }, [language]);


  const handleServiceClick = (id) => {
    navigate(`/services/organicpro/${id}`);
  };
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  return (
    <div className="services-page">
      <div className="left-filter">
      <div className="left-image">
            <img src={organicImg} alt="This is cover photo"/>
          </div>
        <div className="left-search">
          <h2>{language === 'az' ? "Kənd təsərrüfatı məhsulları sifariş edə bilərsiniz." :"You can order agricultural products."}</h2>
          <form>
          <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">{language === 'az' ? 'Məkan seçin' : 'Select a location'}</option>
              
              {organicItems.map((item) => (
                <option key={item.id} value={item.location}>
                  {item.location}
                </option>
              ))}
        </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={minDate}
            />
            <button type="submit">{language === 'az' ? 'Axtar' : 'Search'}</button>
          </form>
        </div>

      </div>

      <div className="right-services">
        
        {organicItems.map((item) => (
          <div className="service-option" key={item.id}>
            <div className="service-img">
              <img
                src={item.image_url}
                alt={item.name}
                onClick={() => handleServiceClick(item.id)}
              />
            </div>
            <div className="service-info">
              <h2>{item.product_name}</h2>
              <p><i>{item.name}</i></p>
              <p>{item.product_detail}</p>
              <p>{item.location}</p>
              <div className="service-price">
                <h3>{item.price} AZN</h3>
              </div>
              

            </div>
            <div className="service-detail">
                <button type="submit" onClick={() => handleServiceClick(item.id)}>
                {language === 'az' ? 'Ətraflı' : 'Details'}
                </button>
              </div>
            
          </div>
        ))}


      </div>
    </div>
  );
}

export default OrganicPro;
