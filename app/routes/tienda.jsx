import styles from "../styles/guitarras.css";
import { useLoaderData } from "@remix-run/react";
import { obtenerGuitarras } from "../models/guitarras.server";
import Guitarra from "../components/guitarra";
export function meta() {
  return [
    { title: "GuitarLA - Tienda" },
    { description: "Tienda de guitarras" },
  ];
}
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
export async function loader() {
  const { data } = await obtenerGuitarras();

  return data;
}

const Tienda = () => {
  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra Coleccion</h2>
      {guitarras.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra) => (
            <Guitarra key={guitarra} guitarra={guitarra} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Tienda;
