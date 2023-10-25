import { useLoaderData } from "@remix-run/react";
import { obtenerPosts } from "../models/posts.server";
import styles from "../styles/blog.css";
import ListadoPosts from "../components/listado-posts";

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await obtenerPosts(postUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "post no encontrada",
    });
  }

  return post;
}

export function meta({ data }) {
  if (!data) {
    return [{ title: "GuitarLA - Error" }];
  }

  return [{ title: `GuitarLA - Nuestro Blog` }];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

const Blog = () => {
  const posts = useLoaderData()

  return (
    <main className="contenedor">

      <ListadoPosts
        posts={ posts.data }
      />
    </main>
  );
};

export default Blog;