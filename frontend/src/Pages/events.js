import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/events.css'
import "../Style/Services.css";
import { useLanguage } from '../LanguageContext';
function Events() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState("");
  const [eventItems, setEventItems] = useState([]); // Event verileri için state
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Etkinlikler için veri çekme
    fetch('https://ecorest.az/backend/get_events.php')
      .then(response => response.json())
      .then(data => setEventItems(data))
      .catch(error => console.error(language === 'az' ? "Verilər yüklənmədi:" : "Failed to load data:", error));
  }, [language]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const resultText = `${location}, ${language === 'az' ? 'Başlama tarixi' : 'Start date'}: ${startDate}`;
    setResult(resultText);
  };

  const handleEventClick = (id) => {
    navigate(`/services/events/${id}`);
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
              

              {eventItems.map((item) => (
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
            <button type="submit">{language === 'az' ? 'Axtar' : 'Search'}</button>
          </form>
        </div>
      </div>

      <div className="right-services">
        <div className="search-info">
          <h2>{result}</h2>
        </div>

        {eventItems.map((event) => (
          <div className="service-option" key={event.id}>
            <div className="service-img">
              <img
                src={event.image_url}
                alt={event.name}
                onClick={() => handleEventClick(event.id)}
              />
            </div>
            <div className="service-info">
              <h2>{event.name}</h2>
              <p>{event.location}</p>
              <div className="service-price">
                <h3>{event.price} AZN</h3>
              </div>
              <div className="service-detail">
                <button type="submit" onClick={() => handleEventClick(event.id)}>
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

export default Events;
