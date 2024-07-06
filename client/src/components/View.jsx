import { useSong } from "../context/songContext";

function View () {
  const {paragraph} = useSong();

  return(
    <>
    {!paragraph ?
      <>
       .
      </> :
      <div className="text-white text-center ">
          {paragraph}
      </div>
  }
    </>
  )  
}

export default View;
