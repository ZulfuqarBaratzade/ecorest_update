import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../Style/ResetPassword.css';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const handleReset = (event) => {
        event.preventDefault();

        // Yeni şifrenin boş olup olmadığını kontrol et
        if (!newPassword) {
            setError("Yeni şifre boş olamaz");
            return;
        }

        // Backend'e POST isteği yaparak şifreyi sıfırla
        fetch('https://ecorest.az/backend/reset_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Şifreniz başarıyla güncellendi!");
                navigate("/login");
            } else {
                setError(data.message);
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            setError("Bir hata oluştu, lütfen tekrar deneyin.");
        });
    };

    return (
        <div className="reset-password-content">
            <div className="reset-password-page">
                <form className="reset-password-form" onSubmit={handleReset}>
                    <h2>Yeni Şifre Belirleyin</h2>
                    {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                    <label>Yeni Şifreniz</label>
                    <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <button type="submit">Şifreyi Güncelle</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
