import React, { useState } from "react";
import "../Style/Header.css";
import logo from "../images/e_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; 
import { useLanguage } from "../LanguageContext";
function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const { user, setUser } = useUser();
  const navigate = useNavigate();
  console.log(user ? user.user_option : "Istifadeci aktiv deyil");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleScrollClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`navbar ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-content">
            <li>
              <Link to={"/services"}>
                {language === "az" ? "Xidmətlərimiz" : "Our Services"}
              </Link>
            </li>
            <li>
              <Link to={"/blogs"}>{language === "az" ? "Bloq" : "Blog"}</Link>
            </li>
            <li>
              <a href="/" onClick={(e) => handleScrollClick(e, "faq")}>
                FAQ
              </a>
            </li>
            <li>
              <a href="/" onClick={(e) => handleScrollClick(e, "contact")}>
                {language === "az" ? "Əlaqə" : "Contact"}
              </a>
            </li>
          </ul>
        </div>
        <div className="lang_login">
          <div className="lang">
            <a href="#" onClick={toggleLanguage}>
              {language === "az" ? "az" : "en"}
            </a>
          </div>
          <div className={`signup ${isMenuOpen ? "active" : ""}`}>
            {user ? (
              <>
              <Link to="/profile" className="profile-button">
                <span className="user-email">{user.firstname}</span>
                {user.user_option === "Xidmət sahibi" && (
                  
                    <i class="fa-solid fa-user"></i>
                  
                )}
                </Link>

                <button className="logout-button" onClick={handleLogout}>
                  <i class="fa-regular fa-circle-xmark"></i>
                </button>
              </>
            ) : (
              <div className="dropdown">
                <a href="#">
                  <i className="fa-regular fa-user"></i>
                </a>
                <ul className="dropdown-menu">
                  <li className="login">
                    <Link to={"/login"}>
                      {language === "az" ? "Daxil ol" : "Login"}
                    </Link>
                  </li>
                  <li className="register">
                    <Link to={"/signup"}>
                      {language === "az" ? "Qeydiyyatdan keç" : "Register"}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
