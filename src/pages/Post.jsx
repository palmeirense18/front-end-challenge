import { useParams } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Post Page</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
