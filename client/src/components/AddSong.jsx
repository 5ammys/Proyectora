import { useForm } from 'react-hook-form'
import { useSong } from '../context/songContext';

function AddSong() {
    const { register, handleSubmit } = useForm()
    const { createSong } = useSong();

    const onSubmit = handleSubmit(async (data) => {
      saveSong(data);
    })

    
    return (
        <div className=''>
            <form onSubmit={onSubmit}>

            </form>
        </div>
    );
}

export default AddSong;