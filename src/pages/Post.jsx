import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "../styles/Post.css";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(null);

  const { slug } = useParams();

  const getPost = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=${slug}`
      );
      const newPosts = await response.json();
      setPost(newPosts[0]);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
      setLoading(false);
      return;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getPost();
  }, []);

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="post">
      <div className="post__container">
        {/* Botão de voltar */}
        <div className="post__back">
          <Link to="/" className="post__back-link">
            <button className="post__back-button">Voltar para o blog</button>
          </Link>
        </div>

        {/* Header do post */}
        <header className="post__header">
          <h1 className="post__title">{post.title.rendered}</h1>

          {/* Imagem do post */}
          {post._embedded?.["wp:featuredmedia"]?.length > 0 && (
            <div className="post__image-wrapper">
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className="post__image"
              />
            </div>
          )}
        </header>

        {/* Conteúdo do post */}
        <article
          className="post__content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </div>
  );
}
