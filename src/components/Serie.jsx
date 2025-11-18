import Modal from "react-modal";
import { useState } from "react";
import { X, Star } from "lucide-react";

export default function Serie({ serie, toggleFavorite, favoritos }) {
    const [isOpen, setIsOpen] = useState(false);

    // Devuelve elemento para la lista de resultados del componente buscador
    return (
        <li>
            {/* Elemento como tal visible al buscar */}
            <div className="elementoSerie" onClick={() => setIsOpen(true)}>
                <img src={serie.image.medium}></img>
                <h2>{serie.name}</h2>
            </div>

            {/* Modal que se abre al pinchar en el elemento de la lista con mas informacion */}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="modalDescripcion"
                overlayClassName="modalOverlay"
            >
                <button onClick={() => setIsOpen(false)} className="modal-close-btn" aria-label="Cerrar">
                    <X />
                </button>
                
                <img src={serie.image.medium}></img>
                <h1>{serie.name}</h1>
                <h2>Rating: {serie.rating.average} / 10 ★</h2>
                <hr />
                <h3>Descripcion:</h3>
                {/* Renderizar asi puesto que viene ya con formato html el elemento */}
                <p dangerouslySetInnerHTML={{ __html: serie.summary }} />

                {/* Boton para añadir a lista de elementos favoritos */}
                <button onClick={() => toggleFavorite(serie)} className="star-fav-btn">
                    {(favoritos.some(favorito => favorito.id === serie.id)) ? "Eliminar de favoritos" : "Añadir a favoritos" }
                    <Star color={(favoritos.some(favorito => favorito.id === serie.id)) ? "gold" : "#bbb" } />
                </button>
            </Modal>

        </li>

    );
}