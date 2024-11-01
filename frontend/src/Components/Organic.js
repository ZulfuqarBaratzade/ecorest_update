import React, { useEffect, useState, useRef } from "react";
import "../Style/Hostels.css";
import { useNavigate } from "react-router-dom"; // React Router'dan useNavigate'i import edin
import { useLanguage } from '../LanguageContext';
function Organic() {
    const [organicItems, setOrganicItems] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate(); // useNavigate hook'unu tanımlayın
    const { language } = useLanguage();
    useEffect(() => {
        fetch('https://ecorest.az/backend/get_organic_items.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrganicItems(data);
                } else {
                    console.error(language === 'az' ? "Kənd təsərrüfatı məhsulları yüklənmədi:" : "Failed to fetch organic items:", data.message);
                }
            })
            .catch(error => console.error(language === 'az' ? "Kənd təsərrüfatı məhsulları yüklənmədi:" : "Error fetching organic items:", error));
        }, [language]);
    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === "left") {
            current.scrollLeft -= 200;
        } else {
            current.scrollLeft += 200;
        }
    };

    const handleOrganicClick = (id) => {
        navigate(`/services/organicpro/${id}`); 
    };
    
    return (
        <div className="organic">
            <h2>{language === 'az' ? "Kənd Təsərrüfatı Məhsulları" : "Agricultural Products"}</h2>
            <button className="scroll-button left" onClick={() => scroll("left")}>
                {"<"}
            </button>
            <div className="organic-wrapper" ref={scrollRef}>
                {organicItems.map((item) => (
                    <div 
                        className="organic-item" 
                        key={item.id} 
                        onClick={() => handleOrganicClick(item.id)}
                    >
                        <img src={item.image_url} alt={item.product_name} />
                        <div className="organic-content">
                            <p>{item.location}</p>
                            <pre>{item.price} {language === 'az' ? 'AZN' : 'AZN'}</pre>
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

export default Organic;
