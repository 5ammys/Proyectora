import { useState } from "react";
import { useEffect } from "react";
import { useSong } from "../context/songContext.jsx";
import { faEdit, faStar, faStarHalfStroke, faTrash } from "@fortawesome/free-solid-svg-icons";
import Boton from "./Boton.jsx";

function ListSong() {
    const {
        songs,
        getSongRequest,
        selectSongRequest,
        addOnFavorities,
        removeFavorite,
        favorities
    } = useSong();

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [fav,setFav] = useState(false)
    const [themes,setThemes] = useState([])
    
    const handleNewFavorite = (song) => {
        try {
            addOnFavorities(song)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handlePullFavorite = (song) => {
        removeFavorite(song)
        
    }

    const editSong = (song) => {
        console.log(song)
    }

    const deletesong = (song) => {
        console.log(song)
    }

    useEffect(() => {
        if (!isInitialLoad) {
            if (fav) {
                setThemes(favorities);
            } else {
                setThemes(songs);
            }
        }
    }, [songs, favorities, isInitialLoad, fav]);

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
            setFav(false)
            setIsInitialLoad(false);
        }
        
    }, [isInitialLoad]);

    return (
        <aside className="mr-12 mb-10 ml-10  relative h-full bg-black border-1 text-white rounded-md border-white"> 
            <div>
            {
                (themes.length!=0)? themes.map(song => {
                    const icono = (!fav)?faStar:faStarHalfStroke;
                    const method = (!fav)?() => handleNewFavorite(song) : () => handlePullFavorite(song);
                    return(
                   
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
                                <Boton icono={icono} method={method} />
                                <Boton icono={faEdit} method={() => editSong(song)} />
                                <Boton icono={faTrash} method={() => deletesong(song)} />
                            </div>
                            
                        </div>
                        
                )}):
                <div className="absolute flex">
                    <p className="mt-40 text-slate-600 text-center">{
                        (fav)?"Añade una canción a la lista de favoritos para visualizarla aquí":
                        "Añade una canción a la lista para visualizarla aquí"}</p>
                    
                </div>   
            }
            </div>
            <footer className="bg-slate-900 flex w-full absolute bottom-0"> 
                <button onClick={() => {
                  setFav(false)
                }}
                className="py-2 w-1/2 hover:bg-slate-800 hover:ease-in">
                    Lista
                </button>
                <button onClick={() => {
                  setFav(true)
                }}
                className="py-2 w-1/2 hover:bg-slate-800 hover:ease-in">
                    Favoritos 
                </button>
            </footer>
        </aside>
    );
}

export default ListSong;