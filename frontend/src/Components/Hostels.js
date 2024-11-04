import React, { useEffect, useState, useRef } from "react";
import "../Style/Components/Hostels.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

function Hostels() {
  const { language } = useLanguage();
  const [hostels, setHostels] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ecorest.az/backend/get_hostels.php")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHostels(data);
        } else {
          console.error("Failed to fetch hostels:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching hostels:", error));
  }, []);

  const handleHostelClick = (id) => {
    navigate(`/services/hostels/${id}`);
  };

  const scrollLeft = () => {
    if (scrollRef.current.scrollLeft === 0) {
      // If already at the start, scroll to the end
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    } else {
      // Scroll to the left by 200px
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
      // If already at the end, scroll to the start
      scrollRef.current.scrollLeft = 0;
    } else {
      // Scroll to the right by 200px
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="hostels">
        <div className="hostels-heads">
          <h2>{language === "az" ? "Qonaqlama" : "Hostels"}</h2>
          <p>
            {language === "az"
              ? "Yeni yerlərdə qalaraq istirahət edin və kəşf edin, hər anın dadını çıxarın!"
              : "Relax and explore by staying in new places, savoring every moment!"}
          </p>
        </div>

        <div className="scroll-buttons">
          <button onClick={scrollLeft}><i className="fa-solid fa-arrow-left"></i></button>
          <button onClick={scrollRight}><i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <div className="hostels-wrapper" ref={scrollRef}>
          {hostels.map((hostel) => (
            <div
              className="hostel-item"
              key={hostel.id}
              onClick={() => handleHostelClick(hostel.id)}
            >
              <div className="hostel-img">
                <img src={hostel.image_url} alt={hostel.product_name} />
              </div>
              <div className="hostel-content">
                <p>{hostel.location}</p>
                <pre>
                  {hostel.price} {language === "az" ? "AZN/gecesi" : "AZN/night"}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hostels;
