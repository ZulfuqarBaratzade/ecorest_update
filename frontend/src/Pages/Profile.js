// import React, { useState, useEffect } from "react";
// import "../Style/Profile.css";
// import { useUser } from "../UserContext";
// import image from '../images/profile.png'
// import { useLanguage } from '../LanguageContext';
// function Profile() {
//   const { user, setUser } = useUser();

//   const [profileImage, setProfileImage] = useState(() => {
//     return user?.profileImage
//       ? `https://ecorest.az/backend/${user.profileImage}`
//       : {image};
//   });

//   const [xidmetNovu, setXidmetNovu] = useState(user?.xidmet_novleri || "");
//   const [price, setPrice] = useState(0.00);
//   const [productDetail, setProductDetail] = useState("");
//   const [productName, setProductName] = useState("");
//   const { language } = useLanguage()
//   const [checked, setChecked] = useState({
//     pet: false,
//     samovar: false,
//     bath: false,
//     parking: false,
//   });

//   useEffect(() => {
//     if (user?.profileImage) {
//       setProfileImage(`https://ecorest.az/backend/${user.profileImage}`);
//     }
//     if (user?.xidmet_novleri) {
//       setXidmetNovu(user.xidmet_novleri);
//     }
//   }, [user?.profileImage, user?.xidmet_novleri]);

//   const handleImageChange = (e) => {
//     // Handle image upload and preview
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setChecked((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   const handlePriceChange = (e) => {
//     setPrice(e.target.value); // Qiymət dəyişəndə state-i yeniləyir
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append('name', user?.firstname || "");
//     formData.append('location', user?.location || "");
//     formData.append('price', price);  // Qiyməti əlavə edin
//     formData.append('phone', user?.phone || ""); // Telefon numarasını ekleyin
//     formData.append('product_detail', productDetail);
//     formData.append('product_name', productName);  

    

  
//     const fileInput = e.target.elements.file_upload;
//     if (fileInput && fileInput.files.length > 0) {
//       formData.append('image', fileInput.files[0]);
//     } else {
//       alert("Şəkil faylı seçilməyib!");
//       return;
//     }
  
//     let apiUrl = "";
  
//     switch (xidmetNovu) {
//       case language === 'az' ? "Qonaqlama" : "Accommodation":
//         apiUrl = "https://ecorest.az/backend/add_hostel.php";
//         break;
//       case language === 'az' ? "Mətbəx" : "Kitchen":
//         apiUrl = "https://ecorest.az/backend/add_kitchen_items.php";
//         break;
//       case language === 'az' ? "Turlar" : "Tours":
//         apiUrl = "https://ecorest.az/backend/add_event.php";
//         break;
//       case language === 'az' ? "Kənd Təsərrüfatı Məhsulları" : "Agricultural Products":
//         apiUrl = "https://ecorest.az/backend/add_organic_items.php";
//         break;
//       default:
//         alert(language === 'az' ? "Xidmət növü düzgün seçilməyib." : "Service type is not selected correctly.");
//         return;
//     }
  
//     fetch(apiUrl, {
//       method: 'POST',
//       body: formData,
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data); // Gelen yanıtı tarayıcı konsolunda kontrol edin
//       if (data.status === 'success') {
//           alert(language === 'az' ? 'Məlumatlar uğurla əlavə edildi!' : 'Information successfully added!');
//       } else {
//          alert(language === 'az' ? 'Məlumat əlavə edilərkən xəta baş verdi: ' + data.message : 'An error occurred while adding information: ' + data.message)
//       }
//   })
  
//     .catch((error) => {
//       console.error('Xəta:', error);
//       alert(language === 'az' ? 'Məlumatları qeyd edərkən xəta baş verdi!' : 'An error occurred while saving the information!');;
//     });
//   };
//   return (
//     <div className="profile-page">
//       <div className="left-profile">
//         <div className="profile-pic">
//           <img src={profileImage} alt="Profil" />
//           <p>{user?.firstname || (language === 'az' ? "Ad Soyad" : "First Last Name")}</p>
//         </div>
//         <div className="personal-information">
//           <h2>{language === 'az' ? 'Şəxsi profiliniz' : 'Your Personal Profile'}</h2>
//           <label htmlFor="file-upload" className="custom-file-upload">
//           <i className="fa-regular fa-user"></i> {language === 'az' ? 'Profil şəkli yüklə' : 'Upload profile picture'}
//           </label>
//           <input id="file-upload" type="file" onChange={handleImageChange} />
//           <div className="descrip">
//           <h3>{user?.location || (language === 'az' ? "Şəhər, Ölkə" : "City, Country")}</h3>
//           <p>{language === 'az' ? 'Xidmət növü' : 'Service Type'}: {xidmetNovu}</p>

//             {/* Conditionally render the rules section */}
//             {xidmetNovu === (language === 'az' ? "Qonaqlama" : "Accommodation") && (
//               <div className="rules-icons">
//                 {checked.pet && <i className="fa-solid fa-dog"></i>}
//                 {checked.bath && <i className="fa-solid fa-bath"></i>}
//                 {checked.samovar && <i className="fa-solid fa-ban-smoking"></i>}
//                 {checked.parking && (
//                   <i className="fa-solid fa-square-parking"></i>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="post-product">
//         <form className="product-form" onSubmit={handleSubmit}>
//           <div className="product-roles">
//           <label>{language === 'az' ? 'Məzmun' : 'Description'}</label>
//             <textarea
//               placeholder={language === 'az' ? "Məhsul haqqında" : "About the product"}
//               value={productDetail}
//               onChange={(e) => setProductDetail(e.target.value)}
//             ></textarea>
//             <label>{language === 'az' ? 'Məhsulun adı' : 'Product Name'}</label>
//             <input
//               type="text"
//               placeholder={language === 'az' ? "Məhsulun adını daxil edin" : "Enter product name"}
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//             />
            
//             {/* Conditionally render the rules input section */}
//             {xidmetNovu === "Qonaqlama" && (
//               <div className="rules">
//                 <h3>{language === 'az' ? 'Qaydalar' : 'Rules'}</h3>
//                 <label>
//                   {language === 'az' ? 'Ev heyvanı' : 'Pets'}
//                   <input
//                     type="checkbox"
//                     name="pet"
//                     checked={checked.pet}
//                     onChange={handleCheckboxChange}
//                   />
//                 </label>
//                 <label>
//                   {language === 'az' ? 'Samovar' : 'Samovar'}
//                   <input
//                     type="checkbox"
//                     name="samovar"
//                     checked={checked.samovar}
//                     onChange={handleCheckboxChange}
//                   />
//                 </label>
//                 <label>
//                   {language === 'az' ? 'Hamam' : 'Bath'}
                  
//                   <input
//                     type="checkbox"
//                     name="bath"
//                     checked={checked.bath}
//                     onChange={handleCheckboxChange}
//                   />
//                 </label>
//                 <label>
//                   {language === 'az' ? 'Maşın saxlama yeri' : 'Parking'}
//                   <input
//                     type="checkbox"
//                     name="parking"
//                     checked={checked.parking}
//                     onChange={handleCheckboxChange}
//                   />
//                 </label>
//               </div>
//             )}

//             <label htmlFor="file-upload2" className="product-photo">
//               {language === 'az' ? 'Məhsul şəkillərini yükləyin' : 'Upload product photos'}
//             </label>
//             <input 
//                 type="file" 
//                 id="file-upload2" 
//                 name="file_upload"  // Bu hissəni əlavə edin
//                 multiple 
//                 />
//           </div>
//           <div className="product-approve">
//             <label>{language === 'az' ? 'Qiymət' : 'Price'}</label>
//                 <input 
//                 type="number" 
//                 value={price} 
//                 onChange={handlePriceChange} 
//                 placeholder={language === 'az' ? "Qiyməti daxil edin" : "Enter price"} 
//                 />

//             <label><label>{language === 'az' ? 'Adınız' : 'Your Name'}</label></label>
//             <input type="text" value={user?.firstname || ""} readOnly />
//             <label>Email</label>
//             <input type="email" value={user?.email || ""} readOnly />
//             <label>{language === 'az' ? 'Mobil nömrəniz' : 'Your Mobile Number'}</label>
//             <input type="tel" value={user?.phone || ""} readOnly />
//             <p>{language === 'az' ? 'Bu nömrəyə SMS gələ bilər' : 'SMS may be sent to this number'}</p>
//           </div>
//           <button type="submit">{language === 'az' ? 'Göndər' : 'Submit'}</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Profile;
