import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Services.css";
import LeftImg from "../images/wallpaper.avif";
import { useLanguage } from "../LanguageContext";

function Services() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { language } = useLanguage();
  const [hostelItems, setHostelItems] = useState([]);
  const [organicItems, setOrganicItems] = useState([]);
  const [eventItems, setEventItems] = useState([]);
  const [kitchenItems, setKitchenItems] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data
    const fetchData = async (url, setState, errorMsg) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(errorMsg, error);
      }
    };

    fetchData(
      "https://ecorest.az/backend/get_organic_items.php",
      setOrganicItems,
      language === "az"
        ? "Organik verilər yüklənmədi:"
        : "Failed to load organic items:"
    );

    fetchData(
      "https://ecorest.az/backend/get_events.php",
      setEventItems,
      language === "az"
        ? "Tədbir verileri yüklənmədi:"
        : "Failed to load events:"
    );

    fetchData(
      "https://ecorest.az/backend/get_hostels.php",
      setHostelItems,
      language === "az"
        ? "Hostel verileri yüklənmədi:"
        : "Failed to load hostels:"
    );

    fetchData(
      "https://ecorest.az/backend/get_kitchen_items.php",
      setKitchenItems,
      language === "az"
        ? "Mətbəx verileri yüklənmədi:"
        : "Failed to load kitchen items:"
    );
  }, [language]);

  const handleServiceClick = (id, serviceType) => {
    switch (serviceType) {
      case "hostels":
        navigate(`/services/hostels/${id}`);
        break;
      case "kitchen":
        navigate(`/services/kitchen/${id}`);
        break;
      case "organicpro":
        navigate(`/services/organicpro/${id}`);
        break;
      case "events":
        navigate(`/services/events/${id}`);
        break;
      default:
        console.error(
          language === "az"
            ? "Bilinməyən xidmət növü:"
            : "Unknown service type:",
          serviceType
        );
    }
  };

  const determineServiceType = (item) => {
    if (hostelItems.some((hostel) => hostel.id === item.id)) {
      return "hostels";
    } else if (organicItems.some((organic) => organic.id === item.id)) {
      return "organicpro";
    } else if (eventItems.some((event) => event.id === item.id)) {
      return "events";
    } else if (kitchenItems.some((kitchen) => kitchen.id === item.id)) {
      return "kitchen";
    } else {
      return "unknown";
    }
  };

  // Merge all items together for pagination
  const allItems = [
    ...hostelItems,
    ...organicItems,
    ...eventItems,
    ...kitchenItems,
  ];

  // Pagination logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = allItems.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

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
            <img src={LeftImg} alt="This is cover photo"/>
          </div>
          <div className="left-search">
            <h2>
              {language === "az"
                ? "İstirahət günlərinizi rəngarəng edin, özünüzə yeni və maraqlı bir macəra yaşadın!"
                : "Brighten up your weekend with a new and exciting adventure!"}
            </h2>
            <form>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">
                  {language === "az" ? "Məkan seçin" : "Select a location"}
                </option>
                {allItems.map((item) => (
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
              <button type="submit">
                {language === "az" ? "Axtar" : "Search"}
              </button>
            </form>
          </div>
        </div>

        <div className="right-services">
      

          {currentItems.map((item) => (
            <div className="service-option" key={item.id}>
              <div className="service-img">
                <img
                  src={item.image_url}
                  alt={item.name}
                  onClick={() =>
                    handleServiceClick(item.id, determineServiceType(item))
                  }
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
                    onClick={() => determineServiceType(item)}
                  >
                    {language === "az" ? "Ətraflı" : "Details"}
                  </button>
                  <p>{language === "az" ? "Qiymətləri görmək üçün tarixləri daxil edin" : "Enter dates to see prices"}</p>
                </div>
             
            </div>
          ))}
        </div>
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

export default Services;
