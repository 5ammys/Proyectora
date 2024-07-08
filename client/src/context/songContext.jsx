import { createContext, useContext, useState } from "react";
import { 
  deleteSong, 
  getSongs, 
  saveSong, 
  updateSong } from "../config/song";

const SongContext = createContext();

export const useSong = () => {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error("useSong must be used within a SongProvider");
  }

  return context;
}

export function SongProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [paragraph,setParagraph] = useState(null);
  const [songSelected,setSongSelected] = useState(null);
  const [favorities,setFavorities] = useState([])


  const selectSongRequest = (song) =>{
      setSongSelected(song)    
  }

  const selectParagraph = (text) => {
      setParagraph(text)
  }

  const addOnFavorities = (song) => {
    if(!favorities.includes(song)){
      setFavorities(favorities => [...favorities,song])
    } else {
      throw new Error('La cancion ya está dentro de Favoritos');
    }
    setErrors(Error)
  }

  const removeFavorite = (song) => {
    setFavorities(favorities.filter(item => item !== song));
  }

  const getSongRequest = async () => {
    try {
      const res = await getSongs()
      setSongs(res.data)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const createSongRequest = async (song) => {
    try {
      const res = await saveSong(song);
      console.log(res);
    } catch (error) {
      setErrors(error.response.data);
      console.log(res);
    }
  }

  const deleteSongRequest = async (song) => {
    try {
      const res = await deleteSong(song)
      console.log(res);
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const updateSongRequest = async (song) => {
    try {
      const res = await updateSong(song)
    } catch (error) {
      setErrors(error.response.data)
    }
  }
  return (
    <SongContext.Provider value={{
      songs,
      favorities,
      getSongRequest,
      createSongRequest,
      deleteSongRequest,
      updateSongRequest,
      selectSongRequest,
      paragraph,
      selectParagraph,
      errors,
      songSelected,
      addOnFavorities,
      removeFavorite
    }}>
      {children}
    </SongContext.Provider>
  )
}
