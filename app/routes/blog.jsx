import { useLoaderData } from "@remix-run/react";
import { obtenerPosts } from "../models/posts.server";
import styles from "../styles/blog.css";
import Post from "../components/post";

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

  const nombre = data.data[0].attributes.nombre;

  return [{ title: `GuitarLA - ${nombre}` }];
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
  const posts = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">Blog</h2>

      <div className="blog">
        {posts.data?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Blog;
