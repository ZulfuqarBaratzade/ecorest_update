import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../Style/Blog-detail.css';

function Blogdetail() {
  const { id } = useParams();  
  const [blog, setBlog] = useState(null);

  useEffect(() => {
  
    fetch(`https://ecorest.az/backend/get_blog_post.php?id=${id}`)
      .then(response => response.json())
      .then(data => setBlog(data))
      .catch(error => console.error('Error fetching blog post:', error));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="blog-details">
      <div className="blog-description">
        <img src={`https://ecorest.az/backend/images/${blog.image}`} alt={blog.title} />
        <div className="blogs-title">
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <small>By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}</small>
        </div>
      </div>           
    </div>
  );
}

export default Blogdetail;
