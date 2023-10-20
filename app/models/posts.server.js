export async function obtenerPosts() {
  const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);

  return await respuesta.json();
}

export async function obtenerPost(nombre) {
  const respuesta = await fetch(
    `${process.env.API_URL}/posts?filters[url]=${nombre}&&populate=imagen`
  );

  return await respuesta.json();
}
