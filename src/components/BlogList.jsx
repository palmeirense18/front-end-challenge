import { useState, useEffect, useCallback } from "react";
import BlogCard from "./BlogCard";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = useCallback(async (pageNum) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518&page=${pageNum}`
      );
      setTotalPages(response.headers.get("x-wp-totalpages"));
      const newPosts = await response.json();
      if (pageNum === 1) {
        setPosts(newPosts);
        console.log("Posts carregados:", newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
      setLoading(false);
      return;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts(page);
  }, [loadPosts]);

  const loadMorePosts = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPosts(nextPage);
    }
  };
  if (loading && posts.length === 0) {
    return <p>Carregando posts...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <BlogCard key={post.id} postData={post} />
        ))}
      </div>

      {/* Botão Carregar Mais */}
      {page < totalPages && !loading && (
        <div className="text-center">
          <button onClick={loadMorePosts} variant="outline" size="lg">
            Carregar mais posts
          </button>
        </div>
      )}
    </div>
  );
}
