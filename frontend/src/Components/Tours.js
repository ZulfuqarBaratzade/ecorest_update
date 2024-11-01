import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için gerekli
import "../Style/Hostels.css";
import { useLanguage } from '../LanguageContext';

function Events() {
    const [events, setEvents] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate(); // useNavigate hook'unu kullan
    const { language } = useLanguage();
    useEffect(() => {
        fetch('https://ecorest.az/backend/get_events.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error(language === 'az' ? "Turlar yüklənmədi:" : "Failed to fetch events:", data.message);
                }
            })
            .catch(error => console.error(language === 'az' ? "Turlar yüklənmədi:" : "Error fetching events:", error));
        }, [language]);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === "left") {
            current.scrollLeft -= 200;
        } else {
            current.scrollLeft += 200;
        }
    };

    const handleEventsClick = (id) => {
        navigate(`/services/events/${id}`); 
    };
    
    return (
        <div className="tours">
            <h2>{language === 'az' ? "Turlar və Masterklaslar" : "Tours and Masterclass"}</h2>
            <button className="scroll-button left" onClick={() => scroll("left")}>
                {"<"}
            </button>
            <div className="tours-wrapper" ref={scrollRef}>
                {events.map((event) => (
                    <div 
                        className="tours-item" 
                        key={event.id}
                        onClick={() => handleEventsClick(event.id)}
                    >
                        <img src={event.image_url} alt={event.product_name} />
                        <div className="tours-content">
                            <p>{event.location}</p>
                            <pre>{event.price} {language === 'az' ? "AZN" : "AZN"}</pre>
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

export default Events;
