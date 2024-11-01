import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Style/Main.css';
import { useLanguage } from '../LanguageContext';
function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Arama terimi varsa query parametreye ekle
    const queryParam = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
    fetch(`https://ecorest-az.preview-domain.com/backend/get_best_places.php${queryParam}`)
      .then(response => response.json())
      .then(data => setNewsList(data))
      .catch(error => console.error(language === 'az' ? "Haberler yüklənə bilmədi:" : "Failed to load news:", error));
  }, [language, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === newsList.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [newsList.length]);

  const handleSearch = () => {
    // Arama sorgusunu query olarak yönlendir
    if (searchQuery.trim() !== "") {
      setSearchQuery(searchQuery);  // setSearchQuery tetikleniyor
    }
  };
  useEffect(  () => {
    fetch('https://ecorest.az/backend/get_best_places.php')
      .then(response => response.json())
      .then(data => setNewsList(data))
      .catch(error => console.error(language === 'az' ? "Haberler yüklənə bilmədi:" : "Failed to load news:", error));
    }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === newsList.length - 1 ? 0 : prevIndex + 1));
    }, 3000); 

    return () => clearInterval(interval);
  }, [newsList.length]);

  const handleBannerClick = (id, serviceType) => {
    console.log("Service Type:", serviceType); 
    if (serviceType === "hostels") {
        navigate(`/services/hostels/${id}`);
    } else if (serviceType === "kitchen") {
        navigate(`/services/kitchen/${id}`);
    } else if (serviceType === "organicpro") {
        navigate(`/services/organicpro/${id}`);
    } else if (serviceType === "events") {
        navigate(`/services/events/${id}`);
    } else {
        console.error("Unknown service type:", serviceType);
    }
};


  const [title, setTitle] = useState(language === 'az' ? "Axtar?" : "Search?");
  const handleClick = (newTitle) =>{
    setTitle(newTitle);
  }
  
  return (
    <div className='main'>
      <div className='main-search'>
        <ul>
    <Link to={"/services/"}>
        <li>
            <i className="fa-solid fa-grip"></i>
            <button
                onClick={() => handleClick(language === 'az' ? "Axtar?" : "Search?")}
                data-hover={language === 'az' ? "Axtar?" : "Search?"}
            >
                {language === 'az' ? "Hamısı" : "All"}
            </button>
        </li>
    </Link>
    <Link to={"/services/hostels"}>
        <li>
            <i className="fa-solid fa-house"></i>
            <button
                onClick={() => handleClick(language === 'az' ? "Harda qalmaq olar?" : "Where to stay?")}
                data-hover={language === 'az' ? "Harda qalmaq olar?" : "Where to stay?"}
            >
                {language === 'az' ? "Qonaqlama" : "Hostels"}
            </button>
        </li>
    </Link>
    <Link to={"/services/kitchen"}>
        <li>
            <i className="fa-solid fa-utensils"></i>
            <button
                onClick={() => handleClick(language === 'az' ? "Milli yeməkləri kəşf et?" : "Discover national dishes?")}
                data-hover={language === 'az' ? "Milli yeməkləri kəşf et?" : "Discover national dishes?"}
            >
                {language === 'az' ? "Mətbəx" : "Kitchen"}
            </button>
        </li>
    </Link>
    <Link to={"/services/events/"}>
        <li>
            <i className="fa-solid fa-person-walking-luggage"></i>
            <button
                onClick={() => handleClick(language === 'az' ? "Həftəsonu?" : "Weekend?")}
                data-hover={language === 'az' ? "Həftəsonu?" : "Weekend?"}
            >
                {language === 'az' ? "Turlar" : "Tours"}
            </button>
        </li>
    </Link>
    <Link to={"/services/organicpro/"}>
        <li>
            <i className="fa-solid fa-leaf"></i>
            <button
                onClick={() => handleClick(language === 'az' ? "Sağlam ol" : "Be healthy")}
                data-hover={language === 'az' ? "Sağlam ol" : "Be healthy"}
            >
                {language === 'az' ? "Kənd Təsərrüfatı Məhsulları" : "Agricultural Products"}
            </button>
        </li>
    </Link>
</ul>
          <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                name="search"
                id="search"
                placeholder={language === 'az' ? "Axtar..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                {language === 'az' ? "Axtar" : "Search"}
              </button>
            </div>
          </div>

        <div className="news-banner">
          {newsList.map((news_banner, index) => (
            <div
              className={`news-poster ${index === currentIndex ? "active" : ""}`}
              key={index}
              onClick={() => handleBannerClick(news_banner.id, news_banner.service_type)}  
            > <img src={`https://ecorest.az/backend/${news_banner.image_url}`} alt={news_banner.product_name} />
              <div className='banner-con'>
                <h2>{news_banner.location}</h2>
                <a href='#'>{language === 'az' ? "Ətraflı" : "Read more"}</a>
            </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Main;
