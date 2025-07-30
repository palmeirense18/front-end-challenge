import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/BlogCard.css";

export default function BlogCard({ postData }) {
  const [post] = useState(postData);

  if (!post) return <div>Carregando...</div>;

  return (
    <div className="blog-card">
      {post._embedded?.["wp:featuredmedia"]?.length > 0 && (
        <Link to={`/post/${post.slug}`} className="blog-card__link">
          <div className="blog-card__image-wrapper">
            <img
              src={post._embedded["wp:featuredmedia"][0].source_url}
              alt={post.title.rendered}
              className="blog-card__image"
            />
          </div>
        </Link>
      )}

      <div className="blog-card__content">
        <Link to={`/post/${post.slug}`} className="blog-card__title-link">
          <h2 className="blog-card__title">{post.title.rendered}</h2>
        </Link>
      </div>
    </div>
  );
}
