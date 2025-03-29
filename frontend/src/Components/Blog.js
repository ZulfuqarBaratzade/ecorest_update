import React, { useState, useEffect } from "react";
import "../Style/Components/Blog.css";
import { useLanguage } from "../LanguageContext";
function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  useEffect(() => {
    fetch("https://ecorest.az/backend/get_blog_posts.php")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 8000); // Change slide every 8 seconds
    return () => clearInterval(interval);
  }, [blogs.length]);

  return (
      <div className="blog-banner">
        {blogs.map((banner, index) => (
          <div
            key={index}
            className={`blog-content ${index === currentIndex ? "active" : ""}`}
          >
            <img
              src={`https://ecorest.az/backend/images/${banner.image}`}
              alt={banner.title}
              className="blog-image"
            />
  
            <div className="blog-poster">
              <h2 className="blog-title">{banner.title}</h2>
              <p className="blog-text">
                {banner.content.substring(0, 150)}...{" "}
                <a href={`/blogs/${banner.id}`}>
                  {language === "az" ? "Ətraflı" : "Read more"}
                </a>
              </p>
            </div>
            
          </div>
        ))}
      </div>
  );
}

export default Blog;
