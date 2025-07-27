import BlogList from "../components/BlogList";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra as últimas novidades, tutoriais e insights do nosso blog
          </p>
        </header>

        <BlogList />
      </div>
    </div>
  );
}
