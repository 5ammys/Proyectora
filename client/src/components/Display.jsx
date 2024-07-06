import View from "./view";

function Display() {
    return (
        <>
            <div className="bg-black flex mt-20 mr-10 h-56 items-center justify-center">
               <View />
            </div>
            <button className="flex text-center text-white">
                Play
            </button>
        </>
    );
}

export default Display;