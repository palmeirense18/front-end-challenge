import { Link } from "react-router-dom";
import { useState } from "react";

export default function BlogCard({ postData }) {
  const [post] = useState(postData);

  if (!post) return <div>Carregando...</div>;

  return (
    <div className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post._embedded &&
        post._embedded["wp:featuredmedia"] &&
        post._embedded["wp:featuredmedia"].length && (
          <Link to={`/post/${post.slug}`}>
            <div className="relative aspect-video">
              <img
                style={{ width: "100px" }}
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

      <div className="p-6">
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-primary transition-colors">
            {post.title.rendered}
          </h2>
        </Link>
      </div>
    </div>
  );
}
