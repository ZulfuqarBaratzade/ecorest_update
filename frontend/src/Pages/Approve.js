import React from "react";
import { useLocation } from "react-router-dom";
import '../Style/Approve.css';
import profile_img from '../images/profile.png'
function Approve(){
    const location = useLocation();
    const { productData, orderData } = location.state || {}; // Eğer state mevcutsa alın

    return(
        <div className="approve">
            <div className="upp">
                <img src={productData.image_url} alt={productData.name} />
                <h2>{productData.product_name}</h2>
                <p>{productData.location}</p>
                <div className="down">
                    <div className="left">
                        <h3>Müraciət Tarixi</h3>
                    </div>
                    <div className="right">
                        <p>{orderData.muracietTarixi}</p>
                    </div>
                </div>
            </div>
            <div className="end">
                <div className="down-left">
                    <img src={profile_img}/>
                    <div className="info">
                        <h4>{productData.name}</h4>
                        <p>Sizinlə əlaqə saxlayacaq!</p>
                    </div>
                </div>
                <div className="complete">
                    <i className="fa-solid fa-check circle"></i>
                    <p>Sifarişiniz təsdiqləndi</p>
                </div>
            </div>
      </div>
    )
}

export default Approve;
