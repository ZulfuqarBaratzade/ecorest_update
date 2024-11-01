import React, { useEffect, useState, useRef } from "react";
import "../Style/Hostels.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../LanguageContext';

function Hostels() {
    const { language } = useLanguage();
    const [hostels, setHostels] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://ecorest.az/backend/get_hostels.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setHostels(data);
                } else {
                    console.error("Failed to fetch hostels:", data.message);
                }
            })
            .catch(error => console.error("Error fetching hostels:", error));
    }, []);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === "left") {
            current.scrollLeft -= 200;
        } else {
            current.scrollLeft += 200;
        }
    };

    const handleHostelClick = (id) => {
        navigate(`/services/hostels/${id}`); 

    };

    return (
        <div className="hostels">
            <h2>{language === 'az' ? 'Qonaqlama' : 'Hostels'}</h2>
            <button className="scroll-button left" onClick={() => scroll("left")}>
                {"<"}
            </button>
            <div className="hostels-wrapper" ref={scrollRef}>
                {hostels.map((hostel) => (
                    <div 
                        className="hostel-item" 
                        key={hostel.id} 
                        onClick={() => handleHostelClick(hostel.id)} 
                    >
                        <img src={hostel.image_url} alt={hostel.product_name} />
                        <div className="hostel-content">
                            <p>{hostel.location}</p>
                            <pre>{hostel.price} {language === 'az' ? 'AZN/gecesi' : 'AZN/night'}</pre>
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

export default Hostels;
