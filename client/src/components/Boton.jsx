import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Boton({icono,method}) {
  return (
    <button onClick={method} className="px-1 rounded-sm hover:bg-white hover:text-black hover:ease-in-out transition duration 500">
      <FontAwesomeIcon icon={icono} />
    </button>
  )
}