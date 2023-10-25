import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { obtenerGuitarras } from "../models/guitarras.server";
import Guitarra from "../components/guitarra";
import styles from "../styles/guitarras.css";
import ListadoGuitarras from "../components/listado-guitarras";

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
      <Outlet context={ useOutletContext() } />
      <h2 className="heading">Nuestra Coleccion</h2>
      <ListadoGuitarras guitarras={ guitarras } />
    </main>
  );
};

export default Tienda;