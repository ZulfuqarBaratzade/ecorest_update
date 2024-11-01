import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Style/BestPlaces.css";
import { useLanguage } from '../LanguageContext';
function BestPlaces() {
    const [places, setPlaces] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate(); 
    const { language } = useLanguage();
    useEffect(() => {
        fetch('https://ecorest.az/backend/get_best_places.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPlaces(data);
                } else {
                    console.error("Failed to fetch places:", data.message);
                }
            })
            .catch(error => console.error("Error fetching places:", error));
    }, []);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === "left") {
            current.scrollLeft -= 200;
        } else {
            current.scrollLeft += 200;
        }
    };

    const handlePlaceClick = () => {

        navigate(`/services/`);
    };

    return (
        <div className="bestplaces">
            <h2>{language === 'az' ? 'Ən populyar yerlər' : 'Most Popular Places'}</h2>
            <button className="scroll-button left" onClick={() => scroll("left")}>
                {"<"}
            </button>
            <div className="places-wrapper" ref={scrollRef}>
                {places.map((place, index) => (
                    <div className="places" key={index} onClick={handlePlaceClick}>
                        <img src={`https://ecorest-az.preview-domain.com/backend/${place.image_url}`} alt={place.product_name} />
                        <div className="places-content">
                            <h3>{place.product_name}</h3>
                            <p>{place.location}</p>
                            {place.price && (
                                <p>{place.price} {language === 'az' ? 'AZN/gecesi' : 'AZN/night'}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll("right")}>
                {">"}
            </button>
        </div>
    );
}

export default BestPlaces;
