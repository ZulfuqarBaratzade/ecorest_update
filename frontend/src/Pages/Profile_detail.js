import React from "react";
import "../Style/profile_detail.css";
import { useLanguage } from '../LanguageContext';
function Profile_detail() {
    const { language } = useLanguage()
    return(
        <div className="container">
            <div className="personal-profile">
            <div className="aside_profile">
                <div className="profile_pic">
                    <img src="https://images.unsplash.com/photo-1730973915515-e79273d90b7c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <p>Filankes</p>
                </div>
                <div className="personal_information">
                <h2>{language === 'az' ? 'Şəxsi profiliniz' : 'Your Personal Profile'}</h2>
                <h4>{language === 'az' ? 'Adınız':'Your name'}</h4>
                <p>Filankesov Filankes</p>
                <h4>{language ==='az' ? 'Emailiniz':'Your email'}</h4>
                <p>filankesov@gmail.com</p>
                <h4>{language ==='az' ? 'Mobil nömrəniz':'Your phone'}</h4>
                <p>+9905050505</p>
                </div>

            </div>
            <div className="my_product">
                <h2>{language === 'az' ? 'Elanlarım':'My Products'}</h2>
                <div className="profile_products">
                    <div className="product-item">
                        <div className="product-img">
                            <img src="https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width='200px' />
                        </div>
                        <div className="kitchen-content">
                                <p>Ganja</p>
                                <pre>50{language === 'az' ? 'AZN' : 'AZN'}</pre>
                                
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Profile_detail;
