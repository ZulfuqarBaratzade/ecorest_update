import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import '../Style/Login.css';
import { useLanguage } from "../LanguageContext";

function Login() {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const { setUser } = useUser();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true); 
        fetch('https://ecorest.az/backend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            
        })
        .then(response => response.json())
        
        .then(data => {
            setLoading(false);
            console.log('Response data:', data);
    
            if (data.status === "success") {
                localStorage.setItem('token', data.token);
                setUser({
                    firstname: data.user.firstname || '',
                    lastname: data.user.lastname || '',
                    email: data.user.email || '',
                    profileImage: data.user.profileImage || 'defaultImage.png', // default değeri belirleyin
                    user_option: data.user.user_option || '',
                    xidmet_novleri: data.user.xidmet_novleri || '',
                    location: data.user.location || '',
                    phone: data.user.phone || ''
                }
            );
                setError(null);
                navigate("/");
            } else {
                setError(data.message || "Giriş sistemi error.");
            }
        })
        .catch(error => {
            setLoading(false);
            console.error('Error:', error);
            setError(language === 'az' ? "Xəta baş verdi, lütfən yenidən cəhd edin." : "An error occurred, please try again.");
        });
    };
    // veya sessionStorage kullanabilirsiniz

    return (
        <div className="login-content">
            <div className="login-page">
                <form onSubmit={handleLogin} className="login-form">
                    <h2>{language === 'az' ? 'Hesabınıza daxil olun' : 'Log in to your account'}</h2>
                    {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                    <label>{language === 'az' ? 'Email' : 'Email'}</label>
                    <input 
                        type="email" 
                        name="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                   <label>{language === 'az' ? 'Şifrə' : 'Password'}</label>
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                   <button type="submit" disabled={loading}>
                   {loading ? (language === 'az' ? 'Yüklənir...' : 'Loading...') : (language === 'az' ? 'Daxil ol' : 'Log In')}</button>
                   <a href="/signup">{language === 'az' ? 'Qeydiyyatınız yoxdursa?' : 'Signup...?'}</a>
                </form>
            </div>
        </div>
    );
}

export default Login;