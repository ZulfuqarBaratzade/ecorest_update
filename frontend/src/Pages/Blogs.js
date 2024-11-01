import React, { useState, useEffect } from "react";
import '../Style/Blogs.css';
import { Link } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://ecorest.az/backend/get_blog_posts.php')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  return (
    <div className="blogs">
      <div className="blog-anons">
        <h2>Bloqlar</h2>
      </div>
      <div className="blogs-contents">
        {blogs.map((blog) => (
          <div key={blog.id} className="blogs-content">
            <img src={`https://ecorest.az/backend/images/${blog.image}`} alt={blog.title} />
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
