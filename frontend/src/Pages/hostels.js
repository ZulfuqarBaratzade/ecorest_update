import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import { useLanguage } from "../LanguageContext";

function HostelPro() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const { language } = useLanguage();
  const [services, setServices] = useState({
    qonaqlama: false,
    metbex: false,
    turlar: false,
    kendteserrufatimehhsullari: false,
  });
  const [result, setResult] = useState("");
  const [hostelItems, setHostelItems] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Her sayfada gösterilecek ürün sayısı

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ecorest.az/backend/get_hostels.php")
      .then((response) => response.json())
      .then((data) => setHostelItems(data))
      .catch((error) =>
        console.error(
          language === "az" ? "Verilər yüklənmədi:" : "Failed to load data:",
          error
        )
      );
  }, [language]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const servicesSelected = Object.keys(services)
      .filter((service) => services[service])
      .join(", ");
    const resultText = `${location}, ${
      language === "az" ? "Başlama tarixi" : "Start date"
    }: ${startDate},${servicesSelected}`;
    setResult(resultText);
  };

  const handleServiceClick = (id) => {
    navigate(`/services/hostels/${id}`);
  };

  // Pagination logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = hostelItems.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(hostelItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <div className="services-page">
        <div className="left-filter">
          <div className="left-search">
            <h2>{language === "az" ? "Axtarış" : "Search"}</h2>
            <form onSubmit={handleSubmit}>
              <label>{language === "az" ? "Məkan" : "Location"}</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">
                  {language === "az" ? "Məkan seçin" : "Select a location"}
                </option>
                {hostelItems.map((item) => (
                  <option key={item.id} value={item.location}>
                    {item.location}
                  </option>
                ))}
              </select>
              <label>
                {language === "az" ? "Başlama tarixi" : "Start Date"}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <button type="submit">
                {language === "az" ? "Axtar" : "Search"}
              </button>
            </form>
          </div>
        </div>

        <div className="right-services">
          <div className="search-info">
            <h2>{result}</h2>
          </div>

          {currentItems.map((item) => (
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
                <p>{item.name}</p>
                <p>{item.location}</p>
                <div className="service-price">
                  <h3>{item.price} AZN</h3>
                </div>
                <div className="service-detail">
                  <button
                    type="submit"
                    onClick={() => handleServiceClick(item.id)}
                  >
                    {language === "az" ? "Ətraflı" : "Details"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              {language === "az" ? "Əvvəlki" : "Previous"}
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {language === "az" ? "Sonrakı" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelPro;
