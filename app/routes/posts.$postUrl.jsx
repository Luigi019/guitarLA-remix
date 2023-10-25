import { useLoaderData } from "@remix-run/react";
import { obtenerPost } from "../models/posts.server";
import { formatearFecha } from "../utils/helpers";
import styles from "../styles/blog.css";

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await obtenerPost(postUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Post no encontrado",
    });
  }

  return post;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta({ data }) {
  if (!data) {
    return [{ title: "GuitarLA - Error" }];
  }

  const nombre = data.data[0].attributes.titulo;

  return [{ title: `GuitarLA - ${nombre}` }];
}

const PostsPostUrl = () => {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post?.data[0].attributes;

  return (
    <article className="contenedor post mt-3">
      <img
        className="imagen"
        src={imagen.data.attributes?.url}
        alt={imagen.data.attributes.name}
      />

      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
};

export default PostsPostUrl;
