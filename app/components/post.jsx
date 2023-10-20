import { Link } from "@remix-run/react";
const Post = ({ post }) => {
  const { titulo, contenido, imagen, url, publishedAt } = post.attributes;

  return (
    <article className="post">
      <img src={imagen.data.attributes.url} alt={titulo} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{publishedAt}</p>
        <p className="resumen">{contenido}</p>

        <Link className="enlace" to={`/posts/${url}`}>
          Ver Publicación
        </Link>
      </div>
    </article>
  );
};

export default Post;
