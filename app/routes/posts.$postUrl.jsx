import { useLoaderData } from "@remix-run/react";
import { obtenerPost } from "../models/posts.server";
import styles from "../styles/blog.css";

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await obtenerPost(postUrl);
  console.log(post.data);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Post no encontrada",
    });
  }

  return post;
}

export function meta({ data }) {
  if (!data) {
    return [{ title: "GuitarLA - Error" }];
  }

  const nombre = data.data[0].attributes.nombre;

  return [{ title: `GuitarLA - ${nombre}` }];
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const Post = () => {
  const post = useLoaderData();
  const { titulo, contenido, imagen } = post.data[0].attributes;
  return (
    <main className="contenedor">
      <h2 className="heading">Blog</h2>
      <div className="blog">
        <img className="imagen" src={imagen.data.attributes.url} alt={titulo} />
        <div className="contenido">
          <h3>{titulo}</h3>
          <p className="texto">{contenido}</p>
        </div>
      </div>
    </main>
  );
};

export default Post;
