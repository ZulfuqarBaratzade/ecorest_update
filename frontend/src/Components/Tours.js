import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için gerekli
import "../Style/Components/Tours.css";
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
        <div className="container">
            <div className="tours">
                <div className="tours-heads">
                    <h2>{language === 'az' ? "Turlar və Masterklaslar" : "Tours and Masterclass"}</h2>
                    <p>{language === 'az' ? "Həftəsonunu unudulmaz və əyləncəli keçirin, özünüzə kiçik bir macəra bəxş edin!" : "Make your weekend unforgettable and fun—treat yourself to a little adventure!"}</p>
                </div>
                <div className="tours-wrapper" ref={scrollRef}>
                    {events.map((event) => (
                        <div 
                            className="tours-item" 
                            key={event.id}
                            onClick={() => handleEventsClick(event.id)}
                        >
                            <div className="tours-img">
                            <img src={event.image_url} alt={event.product_name} />
                            </div>
                            <div className="tours-content">
                                <p>{event.location}</p>
                                <pre>{event.price} {language === 'az' ? "AZN" : "AZN"}</pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Events;
