import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import { useLanguage } from '../LanguageContext'; // Dil kontekstini daxil edin

function OrganicPro() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [services, setServices] = useState({
    qonaqlama: false,
    metbex: false,
    turlar: false,
    kendteserrufatimehhsullari: false,
  });
  const [result, setResult] = useState("");
  const [organicItems, setOrganicItems] = useState([]); // Organik ürünler için state
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Organik ürünler için veri çekme
    fetch('https://ecorest.az/backend/get_organic_items.php')
      .then(response => response.json())
      .then(data => setOrganicItems(data))
      .catch(error => console.error(language === 'az' ? "Verilər yüklənmədi:" : "Failed to load data:", error));
    }, [language]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const servicesSelected = Object.keys(services)
      .filter((service) => services[service])
      .join(", ");

      const resultText = `${location}, ${language === 'az' ? 'Başlama tarixi' : 'Start date'}: ${startDate},${guestCount} ${language === 'az' ? 'qonaq sayı' : 'guest count'}, ${servicesSelected}`;

      setResult(resultText);
  };

  const handleServiceClick = (id) => {
    navigate(`/services/organicpro/${id}`);
  };

  return (
    <div className="services-page">
      <div className="left-filter">
        <div className="left-search">
          <h2>{language === 'az' ? 'Axtarış' : 'Search'}</h2>
          <form onSubmit={handleSubmit}>
          <label>{language === 'az' ? 'Məkan' : 'Location'}</label>
          <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">{language === 'az' ? 'Məkan seçin' : 'Select a location'}</option>
              
              {/* Veritabanından gelen lokasyonları dinamik olarak ekliyoruz */}
              {organicItems.map((item) => (
                <option key={item.id} value={item.location}>
                  {item.location} {/* Lokasyonu göster */}
                </option>
              ))}
        </select>
            <label>{language === 'az' ? 'Başlama tarixi' : 'Start Date'}</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>{language === 'az' ? 'Qonaq sayı' : 'Guest Count'}</label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />
            <button type="submit">{language === 'az' ? 'Axtar' : 'Search'}</button>
          </form>
        </div>
        <div className="left-input">
          <h2>{language === 'az' ? 'Xidmətlər' : 'Services'}</h2>
          <div>
            <input
              type="checkbox"
              checked={services.qonaqlama}
              onChange={() =>
                setServices({
                  ...services,
                  qonaqlama: !services.qonaqlama,
                })
              }
            />
            <label>{language === 'az' ? 'Qonaqlama' : 'Accommodation'}</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={services.metbex}
              onChange={() =>
                setServices({ ...services, metbex: !services.metbex })
              }
            />
            <label>{language === 'az' ? 'Mətbəx' : 'Kitchen'}</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={services.turlar}
              onChange={() =>
                setServices({ ...services, turlar: !services.turlar })
              }
            />
           <label>{language === 'az' ? 'Turlar' : 'Tours'}</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={services.kendteserrufatimehhsullari}
              onChange={() =>
                setServices({
                  ...services,
                  kendteserrufatimehhsullari: !services.kendteserrufatimehhsullari,
                })
              }
            />
            <label>{language === 'az' ? 'Kənd Təsərrüfatı Məhsulları' : 'Agricultural Products'}</label>
          </div>
        </div>
      </div>

      <div className="right-services">
        <div className="search-info">
          <h2>{result}</h2>
        </div>

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
              <h2>{item.name}</h2>
              <p>{item.location}</p>
              <div className="service-price">
                <h3>{item.price} AZN</h3>
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
  );
}

export default OrganicPro;
