import React, { useState } from "react";
import "../Style/Components/Contact.css";
import { useLanguage } from "../LanguageContext";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { language } = useLanguage();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      subject,
      message,
    };

    fetch("https://ecorest.az/backend/contact_form.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setResponseMessage(
            language === "az"
              ? "Mesajınız uğurla göndərildi!"
              : "Your message was sent successfully!"
          );

          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        } else {
          setResponseMessage(
            language === "az"
              ? `Xəta: ${data.message}`
              : `Error: ${data.message}`
          );
        }
      })
      .catch((error) => {
        setResponseMessage(
          language === "az"
            ? "Mesaj göndərilərkən xəta baş verdi."
            : "An error occurred while sending your message."
        );
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="contact" id="contact">
        <h2>{language === "az" ? "Bizimlə Əlaqə" : "Contact Us"}</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-info">
            <input
              type="text"
              placeholder={language === "az" ? "Adınız..." : "Your Name..."}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder={
                language === "az" ? "E-poçt ünvanınız..." : "Your Email..."
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={language === "az" ? "Mövzu..." : "Subject..."}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="contact-message">
            <textarea
              placeholder={language === "az" ? "Mesajınız" : "Your Message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">{language === "az" ? "Göndər" : "Send"}</button>
        </form>
        {responseMessage && (
          <p className="response-message">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
