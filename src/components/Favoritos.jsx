import Modal from "react-modal";
import { useState } from "react";
import { X, Star } from "lucide-react";

import Serie from "./Serie";

export default function Favoritos({ seriesFavoritas, toggleFavorite }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Boton visible desde la barra de busqueda en elemento buscador */}
            <button onClick={() => setIsOpen(true)} className="favoritos-btn">
                <Star color={"gold"} />
            </button>

            {/* Modal que  */}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="modalDescripcion"
                overlayClassName="modalOverlay"
            >
                <button onClick={() => setIsOpen(false)} className="modal-close-btn" aria-label="Cerrar">
                    <X />
                </button>

                {/* Renderizado */}
                <ul>
                    {seriesFavoritas.map((serie) => (
                        <Serie serie={serie} key={serie.id} toggleFavorite={toggleFavorite} favoritos={seriesFavoritas} />
                    ))}
                </ul>

            </Modal>
        </div>
    )
}