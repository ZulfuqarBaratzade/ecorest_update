import React, { useEffect, useState, useRef } from "react";
import "../Style/Components/Organic.css";
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

    const handleOrganicClick = (id) => {
        navigate(`/services/organicpro/${id}`); 
    };
    const scrollLeft = () => {
        if (scrollRef.current.scrollLeft === 0) {
          // If already at the start, scroll to the end
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        } else {
          // Scroll to the left by 200px
          scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
      };
    
      const scrollRight = () => {
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
          // If already at the end, scroll to the start
          scrollRef.current.scrollLeft = 0;
        } else {
          // Scroll to the right by 200px
          scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
      };
    
    return (
        <div className="container">
            <div className="organic">
                <div className="organic-heads">
                    <h2>{language === 'az' ? "Kənd Təsərrüfatı Məhsulları" : "Agricultural Products"}</h2>
                    <p>{language === 'az' ? "Kənd təsərrüfatı məhsulları sifariş edə bilərsiniz." :"You can order agricultural products."}</p>
                </div>
                <div className="organic-wrapper" ref={scrollRef}>
                    {organicItems.map((item) => (
                        <div 
                            className="organic-item" 
                            key={item.id} 
                            onClick={() => handleOrganicClick(item.id)}
                        >
                            <div className="organic-img">
                            <img src={item.image_url} alt={item.product_name} />
                            </div>
                            <div className="organic-content">
                                <p>{item.location}</p>
                                <pre>{item.price} {language === 'az' ? 'AZN' : 'AZN'}</pre>
                            </div>
                        </div>
                    ))}
                </div>
           
            </div>
        </div>
    );
}

export default Organic;
