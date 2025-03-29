import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Components/Kitchen.css";
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
    

    const handleKitchenClick = (id) => {
        navigate(`/services/kitchen/${id}`); 
    };

    return (
            <div className="kitchen">
                <div className="kitchen-heads">
                    <h2>{language === 'az' ? 'Mətbəx' : 'Kitchen'}</h2>
                    <p>{language ==='az' ? 'Bəzən sadəcə fərqli bir dadı yaşamaq üçün, yalnız o yemək üçün yola çıxa bilərsiniz.':'Sometimes, just to experience a unique flavor, you might set out on a journey for that one special dish.'}</p>
                </div>
                <div className="scroll-buttons">
                    <button onClick={scrollLeft}><i class="fa-solid fa-chevron-left"></i></button>
                    <button onClick={scrollRight}><i class="fa-solid fa-chevron-right"></i></button>
                </div>  
                <div className="kitchen-wrapper" ref={scrollRef}>
                    {kitchenItems.map((item) => (
                        <div 
                            className="kitchen-item" 
                            key={item.id} 
                            onClick={() => handleKitchenClick(item.id)} 
                        >
                            <div className="kitchen-img">
                                <img src={item.image_url} alt={item.product_name} />
                            </div>
                            <div className="kitchen-content">
                                <p>{item.location}</p>
                                <pre>{item.price} {language === 'az' ? 'AZN' : 'AZN'}</pre>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default Kitchen;
