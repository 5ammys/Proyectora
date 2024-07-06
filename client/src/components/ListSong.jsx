import { useState } from "react";
import { useEffect } from "react";
import { useSong } from "../context/songContext.jsx";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import Boton from "./Boton.jsx";

function ListSong() {
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const {
        songs,
        getSongRequest,
        selectSongRequest,
        addOnFavorities,
    } = useSong();

    const newFavorite = (song) => {
        try {
            addOnFavorities(song)
        } catch (error) {
            console.log(error)
        }

    }

    const editSong = (song) => {
        console.log(song)
    }

    const deletesong = (song) => {
        console.log(song)
    }

    useEffect(() => {
        const fetchData = () => {
            try {
                getSongRequest();
            } catch (error) {
                console.error("Error obteniendo canciones:", error);
            }
        }
        if (isInitialLoad) {
            fetchData();
            setIsInitialLoad(false);

        }
        

    }, [isInitialLoad]);

    return (
        <aside className="mr-12 mb-10 ml-10  relative h-full bg-black border-1 text-white rounded-md border-white">
            {
            (songs.length!=0)? songs.map(song => (
                <div key={song._id} className="flex group mx-1 hover:bg-orange-700 hover:ease-in-out transition duration 500">
                    <button className="w-full text-left"
                        onClick={
                            () => selectSongRequest(song)
                        }>
                        <li className="p-2 flex m-2 list-none " >
                            <div>
                                {song.name}
                            </div>
                        </li>
                    </button>
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Boton icono={faStar} method={() => newFavorite(song)} />
                        <Boton icono={faEdit} method={() => editSong(song)} />
                        <Boton icono={faTrash} method={() => deletesong(song)} />
                    </div>
                </div>
            )):
            <p className="mt-40 text-slate-600">Añade una canción a la lista para visualizarla aquí</p>
            }
            <footer className="absolute bottom-0"> Hola</footer>
        </aside>
    );
}

export default ListSong;