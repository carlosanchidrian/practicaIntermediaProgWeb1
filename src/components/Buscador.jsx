import { useState, useEffect } from "react";

import Serie from "./Serie";
import Favoritos from "./Favoritos";

export default function Buscador() {
    const [busqueda, setBusqueda] = useState("");
    const [series, setSeries] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    // Funcion para añadir/quitar de favoritos una serie
    const toggleFavorite = (serie) => {
        let updatedFavoriteSeries;

        if (favoritos.some(favorito => favorito.id === serie.id)) {
            updatedFavoriteSeries = favoritos.filter(fav => fav.id !== serie.id);
        } else {
            updatedFavoriteSeries = [...favoritos, serie];
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavoriteSeries));

        setFavoritos(updatedFavoriteSeries);
    };

    useEffect(() => {
        // Fetch a la API al cargar el componente para cargar la lista de series
        fetch("https://api.tvmaze.com/shows")
            .then(res => res.json())
            .then(data => setSeries(data));

        // Cargar series favoritas desde localStorage al inicializar
        const savedItems = localStorage.getItem('favorites');
        
        if (savedItems) {
            setFavoritos(JSON.parse(savedItems));
        }
    }, []);

    // Funcion que filtra las series a renderizar en el return principal basado en el campo de busqueda
    const seriesFiltered = series.filter(serie =>
        serie.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <div className="top-bar">

                <div className="top-bar-content">
                    {/* Barra buscador */}
                    <input
                        className="buscador-input"
                        type="text"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        placeholder="Buscar serie..."
                    />

                    {/* Boton de favoritos aparece/desaparece si hay o no elementos en la lista */}
                    {favoritos.length > 0 && <Favoritos seriesFavoritas={favoritos} toggleFavorite={toggleFavorite} />}

                </div>

            </div>

            {/* Resultados de la busqueda */}
            <div className="resultados-container">

                <div className="series-list">
                    {}
                    <ul>
                        {seriesFiltered.map(serie =>
                            <Serie key={serie.id} serie={serie} toggleFavorite={toggleFavorite} favoritos={favoritos} />
                        )}
                    </ul>

                </div>

            </div>

        </>
    );
}
