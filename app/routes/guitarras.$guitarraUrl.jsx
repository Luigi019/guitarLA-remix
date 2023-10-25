import { useLoaderData, useOutletContext } from "@remix-run/react";
import { obtenerGuitarra } from "../models/guitarras.server";
import styles from "../styles/guitarras.css";
import { useState } from "react";

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

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await obtenerGuitarra(guitarraUrl);

  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada",
    });
  }

  return guitarra;
}

const Guitarra = () => {
  const [cantidad, setCantidad] = useState(0);
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;
  const { agregarCarrito } = useOutletContext();


  const handleSubmit = (event) => {
    event.preventDefault();

    if (cantidad < 1) {
      alert("Debes seleccionar una cantidad");
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
    }
    agregarCarrito(guitarraSeleccionada)
  };

  return (
    <main className="contenedor guitarra">
      <img
        className="imagen"
        src={ imagen.data.attributes.url }
        alt={ imagen.data.attributes.name }
      />

      <div className="contenido">
        <h3>{ nombre }</h3>
        <p className="texto">{ descripcion }</p>
        <p className="precio">$ { precio }</p>

        <form className="formulario" onSubmit={ handleSubmit }>
          <label htmlFor="cantidad">Cantidad</label>
          <select id="cantidad" onChange={ (e) => setCantidad(e.target.value) }>
            <option value="">--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </main>
  );
};

export default Guitarra;