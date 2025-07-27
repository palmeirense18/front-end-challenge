import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Botão de voltar */}
          <div className="mb-8">
            <Link to="/">
              <button variant="ghost" className="gap-2">
                Voltar para o blog
              </button>
            </Link>
          </div>

          {/* Header do post */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {post.title.rendered}
            </h1>

            {/* Imagem do post */}
            {post._embedded &&
              post._embedded["wp:featuredmedia"] &&
              post._embedded["wp:featuredmedia"].length && (
                <div className="relative aspect-video">
                  <img
                    style={{ width: "100px" }}
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post.title.rendered}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
          </header>

          {/* Conteúdo do post */}
          <article
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </div>
    </div>
  );
}
