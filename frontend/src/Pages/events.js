import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/events.css";
import "../Style/Services.css";
import { useLanguage } from "../LanguageContext";
import masterklass from '../images/master.png'
function Events() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventItems, setEventItems] = useState([]); // Event verileri için state
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Etkinlikler için veri çekme
    fetch("https://ecorest.az/backend/get_events.php")
      .then((response) => response.json())
      .then((data) => setEventItems(data))
      .catch((error) =>
        console.error(
          language === "az" ? "Verilər yüklənmədi:" : "Failed to load data:",
          error
        )
      );
  }, [language]);
  const handleEventClick = (id) => {
    navigate(`/services/events/${id}`);
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
    <div className="container">
      <div className="services-page">
        <div className="left-filter">
          <div className="left-image">
            <img src={masterklass}  alt="masterklass"/>
          </div>
          <div className="left-search">
            <h2>{language === "az"
                ? "İstirahət günlərinizi rəngarəng edin, özünüzə yeni və maraqlı bir macəra yaşadın!"
                : "Brighten up your weekend with a new and exciting adventure!"}</h2>
            <form>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">
                  {language === "az" ? "Məkan seçin" : "Select a location"}
                </option>

                {eventItems.map((item) => (
                  <option key={item.id} value={item.location}>
                    {item.location} {/* Lokasyonu göster */}
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
              <button type="submit">
                {language === "az" ? "Axtar" : "Search"}
              </button>
            </form>
          </div>
        </div>

        <div className="right-services">
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
                <h2>{event.product_name}</h2>
                <p><i>{event.name}</i></p>
                <p>{event.product_detail}</p>
                <p>{event.location}</p>
                <div className="service-price">
                  <h3>{event.price} AZN</h3>
                </div>
              </div>
              <div className="service-detail">
                  <button
                    type="submit"
                    onClick={() => handleEventClick(event.id)}
                  >
                    {language === "az" ? "Ətraflı" : "Details"}
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
