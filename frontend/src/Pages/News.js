import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../Style/News.css';

function News() {
    const { id } = useParams(); // URL'den haber ID'sini alın
    const [news, setNews] = useState(null);

    useEffect(() => {
        fetch(`https://ecorest.az/backend/get_news.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setNews(data);
                } else {
                    console.error("Failed to fetch news:", data.message);
                }
            })
            .catch(error => console.error("Error fetching news:", error));
    }, [id]);

    if (!news) return <div>Loading...</div>;

    return (
        <div className="news-details">
            <div className="news-description">
                <img src={news.image} alt={news.title} /> {/* Tam URL'yi kullanıyoruz */}
                <div className="news-title">
                    <h2>{news.title}</h2>
                    <p>{news.text}</p>
                </div>
            </div>
        </div>
    );
}

export default News;
