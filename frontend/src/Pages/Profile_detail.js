import React from "react";
import "../Style/profile_detail.css";
import { useLanguage } from "../LanguageContext";
function Profile_detail() {
  const { language } = useLanguage();
  return (
      <div className="personal-profile">
        <div className="aside_profile">
          <div className="profile_pic">
            <img src="https://images.unsplash.com/photo-1730973915515-e79273d90b7c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <p>Filankes</p>
          </div>
          <div className="personal_information">
            <h2>
              {language === "az" ? "Şəxsi profiliniz" : "Your Personal Profile"}
            </h2>
            <h4>{language === "az" ? "Adınız" : "Your name"}</h4>
            <p>Filankesov Filankes</p>
            <h4>{language === "az" ? "Emailiniz" : "Your email"}</h4>
            <p>filankesov@gmail.com</p>
            <h4>{language === "az" ? "Mobil nömrəniz" : "Your phone"}</h4>
            <p>+9905050505</p>
          </div>
        </div>
        <div className="my_product">
          <h2>{language === "az" ? "Elanlarım" : "My Products"}</h2>
          <div className="profile_products">
            <div className="product-item">
              <div className="product-img">
                <img src="https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="product_content">
                <p>Ganja</p>
                <pre>50{language === "az" ? "AZN" : "AZN"}</pre>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="product_content">
                <p>Ganja</p>
                <pre>50{language === "az" ? "AZN" : "AZN"}</pre>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="product_content">
                <p>Ganja</p>
                <pre>50{language === "az" ? "AZN" : "AZN"}</pre>
              </div>
            </div>
            <div className="product-item">
              <div className="product-img">
                <img src="https://plus.unsplash.com/premium_photo-1663957861996-8093b48a22e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="product_content">
                <p>Ganja</p>
                <pre>50{language === "az" ? "AZN" : "AZN"}</pre>
              </div>
            </div>
          </div>
          <div className="new_product">
            <div className="new_p">
            <button>
              {language === "az" ? "Yeni elan yerləşdir" : "Add new product"}
            </button>
            </div>
            
            <form className="product-form">
                <label for='product-type'>Xidmət növü seçin</label>
                <select>
                    <option>Qonaqlama</option>
                    <option>Mətbəx</option>
                    <option>Kənd Təsərrüfatı Məhssuları</option>
                    <option>Turlar və Masterklasslar</option>
                </select>
                <label>
                  {language === "az" ? "Məhsulun adı" : "Product Name"}
                </label>
                <input
                  type="text"
                  placeholder={
                    language === "az"
                      ? "Məhsulun adını daxil edin"
                      : "Enter product name"
                  }
                />
                <label>{language === "az" ? "Məzmun" : "Description"}</label>
                <textarea
                  placeholder={
                    language === "az" ? "Məhsul haqqında" : "About the product"
                  }
                  
                ></textarea>
                

                <label htmlFor="file-upload2" className="product-photo">
                  {language === "az"
                    ? "Məhsul şəkillərini yükləyin"
                    : "Upload product photos"}
                </label>
                <input
                  type="file"
                  id="file-upload2"
                  name="file_upload"
                  multiple
                />
             
                <label>{language === "az" ? "Qiymət" : "Price"}</label>
                <input
                  type="number"
                  placeholder={
                    language === "az" ? "Qiyməti daxil edin" : "Enter price"
                  }
                />

                <label>
                  <label>{language === "az" ? "Adınız" : "Your Name"}</label>
                </label>
                <input type="text" value="Filankes" readOnly />
                <label>Email</label>
                <input type="email" value="Filankes" readOnly />
                <label>
                  {language === "az" ? "Mobil nömrəniz" : "Your Mobile Number"}
                </label>
                <input type="tel" value="050505055" readOnly />
                <p>
                  {language === "az"
                    ? "Bu nömrəyə SMS gələ bilər"
                    : "SMS may be sent to this number"}
                </p>
              <button type="submit">
                {language === "az" ? "Göndər" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
export default Profile_detail;
