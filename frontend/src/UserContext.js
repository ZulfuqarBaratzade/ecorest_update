import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // Token durumu ekleyin

    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini yükleyin
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token'); // Token'ı alın

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && typeof parsedUser === 'object') {
                    setUser(parsedUser);
                }
            }
            if (storedToken) {
                setToken(storedToken); // Token'ı ayarlayın
            }
        } catch (error) {
            console.error("Failed to parse user or token from localStorage", error);
            localStorage.removeItem('user');
            localStorage.removeItem('token'); // Hata durumunda temizleyin
        }
    }, []);

    // Kullanıcı veya token bilgisi değiştiğinde localStorage'a kaydedin
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user'); // Kullanıcı çıkış yaparsa temizle
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token'); // Token temizleme işlemi
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
