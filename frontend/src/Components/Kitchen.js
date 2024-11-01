import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Hostels.css";
import { useLanguage } from '../LanguageContext';
function Kitchen() {
    const [kitchenItems, setKitchenItems] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate(); 
    const { language } = useLanguage();

    useEffect(() => {
        fetch('https://ecorest.az/backend/get_kitchen_items.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setKitchenItems(data);
                } else {
                    console.error("Failed to fetch kitchen items:", data.message);
                }
            })
            .catch(error => console.error("Error fetching kitchen items:", error));
    }, []);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === "left") {
            current.scrollLeft -= 200;
        } else {
            current.scrollLeft += 200;
        }
    };

    const handleKitchenClick = (id) => {
        navigate(`/services/kitchen/${id}`); 
    };

    return (
        <div className="kitchen">
            <h2>{language === 'az' ? 'Mətbəx' : 'Kitchen'}</h2>
            <button className="scroll-button left" onClick={() => scroll("left")}>
                {"<"}
            </button>
            <div className="kitchen-wrapper" ref={scrollRef}>
                {kitchenItems.map((item) => (
                    <div 
                        className="kitchen-item" 
                        key={item.id} 
                        onClick={() => handleKitchenClick(item.id)} 
                    >
                        <img src={item.image_url} alt={item.product_name} />
                        <div className="kitchen-content">
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

export default Kitchen;
