import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('az'); // Default dil Azərbaycan dili

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'az' ? 'en' : 'az'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};