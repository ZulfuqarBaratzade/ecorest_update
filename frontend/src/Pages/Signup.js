import React, { useState } from "react";
import '../Style/Sign.css';
import { Link } from "react-router-dom";
import { useLanguage } from '../LanguageContext';
function Signup() {
    const [formData, setFormData] = useState({
        user_option: '',
        email: '',
        phone: '',
        password: '',
        first_name: '',
        last_name: '',
        profile_image: null,  
        xidmet_novleri: '', 
        location: ''  
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile_image: e.target.files[0]  
        });
    };
    const { language } = useLanguage();
    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        fetch('https://ecorest.az/backend/signup.php', {
            method: 'POST',
            body: formDataToSend 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert(language === 'az' ? "Qeydiyyat uğurla başa çatdı!" : "Registration completed successfully!");
                window.location.href = "/login";
            } else {
                alert(language === 'az' ? "Qeydiyyat xətası: " + data.message : "Registration error: " + data.message);
            }
        })
        .catch(error => {
            console.error(language === 'az' ? 'Xəta:' : 'Error:', error);
        });
    };

    return (
        <div className="sign-content">
            <div className="sign">
                <form className="sign-form" onSubmit={handleSubmit}>
                    <h2>{language === 'az' ? 'Qeydiyyat' : 'Sign Up'}</h2>
                    <select id="user_option" name="user_option" value={formData.user_option} onChange={handleChange} required>
                        <option value="">{language === 'az' ? 'Hesab növü seçin' : 'Select Account Type'}</option>
                        <option value="Adi istifadəçi">{language === 'az' ? 'Adi istifadəçi' : 'Regular User'}</option>
                        <option value="Xidmət sahibi">{language === 'az' ? 'Xidmət sahibi' : 'Service Provider'}</option>
                    </select>

                    {/* Eğer "Xidmət sahibi" seçildiyse ad, soyad, profil resmi yükleme ve location alanlarını göster */}
                    {formData.user_option === "Xidmət sahibi" && (
                        <>
                           <label>{language === 'az' ? 'Ad' : 'First Name'}</label>
                            <input 
                                type="text" 
                                name="first_name" 
                                value={formData.first_name} 
                                onChange={handleChange} 
                                required 
                                placeholder={language === 'az' ? 'Adınızı daxil edin' : 'Enter your first name'}
                            />
                            <label>{language === 'az' ? 'Soyad' : 'Last Name'}</label>
                            <input 
                                type="text" 
                                name="last_name" 
                                value={formData.last_name} 
                                onChange={handleChange} 
                                required 
                                placeholder={language === 'az' ? 'Soyadınızı daxil edin' : 'Enter your last name'}
                            />
                            <label>{language === 'az' ? 'Profil şəkli yükləyin' : 'Upload Profile Picture'}</label>
                            <input 
                                type="file" 
                                name="profile_image" 
                                onChange={handleFileChange} 
                            />

                            <label>{language === 'az' ? 'Kateqoriya' : 'Category'}</label>
                            <select name="xidmet_novleri" value={formData.xidmet_novleri} onChange={handleChange}>
                                <option value="">{language === 'az' ? 'Siyahıdan seçin' : 'Select from list'}</option>
                                <option value="Qonaqlama">{language === 'az' ? 'Qonaqlama' : 'Accommodation'}</option>
                                <option value="Mətbəx">{language === 'az' ? 'Mətbəx' : 'Kitchen'}</option>
                                <option value="Turlar">{language === 'az' ? 'Turlar' : 'Tours'}</option>
                                <option value="Kənd Təsərrüfatı Məhsulları">{language === 'az' ? 'Kənd Təsərrüfatı Məhsulları' : 'Agricultural Products'}</option>
                            </select>

                            <label>{language === 'az' ? 'Yerləşmə' : 'Location'}</label>
                            <input 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                required 
                                placeholder={language === 'az' ? 'Yerləşmənizi daxil edin' : 'Enter your location'}
                            />
                        </>
                    )}

                    <label>{language === 'az' ? 'Email ünvanınız':'Your email'}</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        placeholder={language === 'az' ? 'Email ünvanınızı daxil edin' : 'Enter your email'}
                    />
                    <label>{language === 'az' ? 'Əlaqə Nömrəniz' : 'Contact Number'}</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        pattern="\d{10,15}" 
                        title={language === 'az' ? "Telefon nömrəsi 10-15 rəqəm arasında olmalıdır" : "Phone number must be between 10-15 digits"}
                        placeholder={language === 'az' ? "Məs:9945500000000" : "e.g.: 994550000000"}
                        required 
                    />
                    <label>{language === 'az' ? 'Şifrə' : 'Password'}</label>
                    <input 
                        type="password" 
                        name="password" 
                        pattern="(?=.*\d)(?=.*[\W_]).{7,}" 
                        title={language === 'az' ? "Minimum 7 xarakter ibarət olmalıdır. Xüsusi simvollardan(məs: *!%) və rəqəmlərdən istifadə edin" : "Must be at least 7 characters long. Use special characters (e.g.: *!%) and numbers"}
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder={language === 'az' ? 'Hesabınız üçün şifrə təyin edin' : 'Set a password for your account'}
                        required 
                    />
                    <div className="check_box">
                    <input type="checkbox" required /> <Link to="/contract">{language === 'az' ? 'Qaydalar & Şərtlər və Məxfilik siyasəti' : 'Terms & Conditions and Privacy Policy'}</Link>
                    </div>
                    <button type="submit">{language === 'az' ? 'Qeydiyyatdan Keç' : 'Sign Up'}</button>
                    <Link to={'/login'}>{language === 'az' ? 'Hesabınız varsa daxil olun' : 'Already have an account? Log in'}</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
