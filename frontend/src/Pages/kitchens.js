import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import { useLanguage } from '../LanguageContext';
function Services() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const { language } = useLanguage();
  const [result, setResult] = useState("");
  const [serviceItems, setServiceItems] = useState([]); // Hizmet verileri için state
  const navigate = useNavigate();

  useEffect(() => {
    // Örneğin, mutfak hizmetleri için veri çekme
    fetch('https://ecorest.az/backend/get_kitchen_items.php')
      .then(response => response.json())
      .then(data => setServiceItems(data))
      .catch(error => console.error(language === 'az' ? "Verilər yüklənmədi:" : "Failed to load data:", error));
  }, [language]);
  const handleServiceClick = (id) => {
    navigate(`/services/kitchen/${id}`);
  };

  return (
    <div className="container">
    <div className="services-page">
      <div className="left-filter">
        <div className="left-search">
          <h2>{language === 'az' ? 'Axtarış' : 'Search'}</h2>
          <form>
            <label>{language === 'az' ? 'Məkan' : 'Location'}</label>
            <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">{language === 'az' ? 'Məkan seçin' : 'Select a location'}</option>
                
               
                {serviceItems.map((item) => (
                  <option key={item.id} value={item.location}>
                    {item.location} 
                  </option>
                ))}
        </select>
            <label>{language === 'az' ? 'Başlama tarixi' : 'Start Date'}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
           <button type="submit">{language === 'az' ? 'Axtar' : 'Search'}</button>
          </form>
        </div>
      </div>

      <div className="right-services">
        <div className="search-info">
          <h2>{result}</h2>
        </div>

        {serviceItems.map((item) => (
          <div className="service-option" key={item.id}>
            <div className="service-img">
              <img
                src={item.image_url}
                alt={item.name}
                onClick={() => handleServiceClick(item.id)}
              />
            </div>
            <div className="service-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <div className="service-price">
                <h3>{item.price} AZN</h3>
                <p>{item.quantity}</p>
              </div>
              <div className="service-detail">
                <button type="submit" onClick={() => handleServiceClick(item.id)}>
                  {language === 'az' ? 'Ətraflı' : 'Details'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Services;
