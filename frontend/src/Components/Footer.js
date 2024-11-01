import React from "react";
import '../Style/Footer.css';
import logo from '../images/e_logo.png';
import { useLanguage } from '../LanguageContext'; // Dil kontekstini daxil edin
import { useLocation } from "react-router-dom";
function Footer(){
    const { language } = useLanguage(); // Dil seçimlərini alın
    const location = useLocation()
    const style = {
        position: location.pathname === "/" ? "relative" : "static",
    }


    return(
        <div className="footer" style={style}>
            <div className="footer-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="footer-services">
                <h2>{language === 'az' ? 'Xidmətlərimiz' : 'Our Services'}</h2>
                <ul>
                    <li><a href="/services/hostels">{language === 'az' ? 'Qonaqlama' : 'Hostels'}</a></li>
                    <li><a href="/services/kitchen">{language === 'az' ? 'Mətbəx' : 'Kitchen'}</a></li>
                    <li><a href="/services/events">{language === 'az' ? 'Turlar' : 'Tours'}</a></li>
                    <li><a href="/services/organicpro">{language === 'az' ? 'Kənd Təsərrüfatı Məhsulları' : 'Agricultural Products'}</a></li>
                </ul>
            </div>
            <div className="footer-news">
                <h2>{language === 'az' ? 'Bloqlar' : 'Blogs'}</h2>
                <ul>
                    <li><a href="/blogs">{language === 'az' ? 'Bloqlar' : 'Blogs'}</a></li>
                </ul>
            </div>
            <div className="footer-support">
                <h2>{language === 'az' ? 'Kömək' : 'Support'}</h2>
                <ul>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#contact">{language === 'az' ? 'Əlaqə' : 'Contact'}</a></li>
                    <li><a href="/contract">{language === 'az' ? 'Qaydalar & Şərtlər və Məxfilik siyasəti' : 'Terms & Conditions and Privacy Policy'}</a></li>
                </ul>
            </div>
            <div className="footer-links">
                <h2>{language === 'az' ? 'Bizi izləyin' : 'Follow Us'}</h2>
                <ul>
                    <li><a href="https://www.facebook.com/ecorest.az/"><i className="fa-brands fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;