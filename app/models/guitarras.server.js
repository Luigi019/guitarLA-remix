export async function obtenerGuitarras() {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?populate=imagen`
  );

  return await respuesta.json();
}

export async function obtenerGuitarra(nombre) {
  const respuesta = await fetch(
    `${process.env.API_URL}/guitarras?filters[url]=${nombre}&&populate=imagen`
  );

  return await respuesta.json();
}
