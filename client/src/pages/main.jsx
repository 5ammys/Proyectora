import ListSong from "../components/ListSong.jsx";
import Song from "../components/Song.jsx";
import Display from "../components/Display.jsx";
import { useAuth } from "../context/authContext.jsx";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function MainPage() {

    const {
        logout,
        isAuthenticated
    } = useAuth()
    
    const navigate = useNavigate();

    useEffect(() => {
      if(!isAuthenticated) navigate('/login');
    },[isAuthenticated])
    

    return (
        <main className="flex flex-col min-h-screen overflow-hidden">
            <header className="m-5 flex justify-between text-white">
                <h1>Proyectora</h1>
                <button onClick={() => {
                    logout()
                }} className="bg-orange-800 p-2 mr-1 rounded-sm hover:bg-orange-600 hover:ease-in-out duration-250 transition">
                    Cerrar Sesión
                </button>
            </header>
            <div className="grid grid-cols-3 flex-1 text-sm">
                <div className="border-grey-700 border-r-1 mb-5">
                    <ListSong />
                    
                </div>
                <div className="border-grey-700 border-r-1 mb-5">
                    <Song />
                </div>
                <div>
                    <Display />
                </div>
            </div>
        </main>
    );
}

export default MainPage;