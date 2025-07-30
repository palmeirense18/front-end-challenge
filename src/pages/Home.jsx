import BlogList from "../components/BlogList";
import "../styles/Home.css";

export default function BlogPage() {
  return (
    <div className="home">
      <div className="home__container">
        <header className="home__header">
          <h1 className="home__title">Blog</h1>
          <p className="home__subtitle">
            Descubra as últimas novidades, tutoriais e insights do nosso blog
          </p>
        </header>

        <BlogList />
      </div>
    </div>
  );
}
