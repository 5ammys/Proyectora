import { useEffect, useState } from "react";
import { useSong } from "../context/songContext";

function Song() {
    const [paragraphs, setParagraphs] = useState([]);

    const {
        songSelected,
        selectParagraph
    } = useSong();

    useEffect(() => {
        const splitLyric = () => {
            if (songSelected) {
                setParagraphs(songSelected.lyric.split('\n\n'))
            }
        }
        splitLyric()
    }, [songSelected])


    return (
        <aside className="mr-12 border-1 h-full bg-black text-white rounded-md border-white">
            {!songSelected ?
                <div className="mx-8 place-content-center text-center">
                    <p className="mt-40 text-slate-600">
                        Selecciona una cancion de la lista
                    </p>
                </div> :
                <div>
                    {paragraphs.map((paragraph, index) => (
                        <button key={index} onClick={
                            () => selectParagraph(paragraph)
                        } className="p-2 w-full text-left" >
                            <p className="p-5 hover:bg-orange-700">
                                {paragraph}
                            </p>
                        </button>
                    ))}
                </div>
            }
        </aside>
    );
}

export default Song;