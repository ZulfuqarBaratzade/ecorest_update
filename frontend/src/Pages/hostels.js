import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import { useLanguage } from "../LanguageContext";
import HostelImg from '../images/hostels.avif'

function HostelPro() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { language } = useLanguage();
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
      <div className="services-page">
        <div className="left-filter">
        <div className="left-image">
            <img src={HostelImg} alt="This is cover photo"/>
          </div>
          <div className="left-search">
            <h2>{language === "az"
              ? "Yeni yerlərdə qalaraq istirahət edin və kəşf edin, hər anın dadını çıxarın!"
              : "Relax and explore by staying in new places, savoring every moment!"}</h2>
            <form>
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
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
                <p><i>{item.name}</i></p>
                <p>{item.product_detail}</p>
                <p>{item.location}</p>
                <div className="service-price">
                  <h3>{item.price} AZN</h3>
                </div>
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
  );
}

export default HostelPro;
