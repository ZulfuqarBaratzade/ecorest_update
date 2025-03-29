import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import { useLanguage } from '../LanguageContext';
import kitchens from '../images/kitchens.jpg'
function Services() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { language } = useLanguage();
  const [serviceItems, setServiceItems] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {

    fetch('https://ecorest.az/backend/get_kitchen_items.php')
      .then(response => response.json())
      .then(data => setServiceItems(data))
      .catch(error => console.error(language === 'az' ? "Verilər yüklənmədi:" : "Failed to load data:", error));
  }, [language]);
  const handleServiceClick = (id) => {
    navigate(`/services/kitchen/${id}`);
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
            <img src={kitchens} alt="This is cover photo"/>
          </div>
        <div className="left-search">
        
          <h2>{language ==='az' ? 'Bəzən sadəcə fərqli bir dadı yaşamaq üçün, yalnız o yemək üçün yola çıxa bilərsiniz.':'Sometimes, just to experience a unique flavor, you might set out on a journey for that one special dish.'}</h2>
          <form>
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
              <h2>{item.product_name}</h2>
              <p><i>{item.name}</i></p>
              <p>{item.product_detail}</p>

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

export default Services;
