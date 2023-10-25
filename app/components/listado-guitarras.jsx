import Guitarra from "./guitarra";

const ListadoGuitarras = ({ guitarras }) => {
  return (
    <>
      {
        guitarras?.length && (
          <div className="guitarras-grid">
            {
              guitarras?.map(guitarra => (
                <Guitarra
                  key={ guitarra?.id }
                  guitarra={ guitarra }
                />
              ))
            }
          </div>
        )
      }
    </>
  );
}

export default ListadoGuitarras;