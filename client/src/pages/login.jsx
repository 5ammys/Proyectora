import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const { signin, isAuthenticated, errors: loginErrors } = useAuth()
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        signin(data)
    })

    useEffect(() => {
      if (isAuthenticated) navigate('/main')
    }, [isAuthenticated])


    return (
        <div className="text-white text-center pb-10 bg-blue-900 shadow-xl py-4 ease-in duration-100 md:rounded-lg mt-20 sm:mx-40 md:mx-70 lg:mx-80">
            <h1 className="text-3xl m-5 ">Login</h1>
            {
                loginErrors.map((errors,i) =>
                  (<div className="bg-red-600 text-white" key={i}>
                    {errors}
                  </div>)
                )   
            }
            <form className='grid grid-cols-1 content-center justify-center ' onSubmit={onSubmit}>
                <div className="">
                
                    <input placeholder="Email" className='p-1 font-normal transition-colors duration-500 outline-none border-transparent border-b-2 focus:border-blue-500 bg-blue-800  px-6 my-2 rounded-sm text-white' type="email" {...register('email', { required: true })} /><p />
                    {
                        errors.email && <p className="text-red-500">Email is required</p>
                    }
                    <input placeholder="Password" className='p-1 font-normal transition-colors duration-500 outline-none border-transparent border-b-2 focus:border-blue-500 bg-blue-800 px-6 my-2 rounded-sm text-white' type="password" {...register('password', {
                        required: true, minLength: {
                            value: 8
                        } 
                    })} /><p />
                    {
                        errors.password && <p className="text-red-500">Password must be at least 8 characters</p>
                    }
                    <br />
                    <button className='bg-blue-700 p-4 shadow-md hover:shadow-xl hover:bg-blue-600 ease-linear duration-100 rounded-md my-4' type="submit">Login</button>
                </div>                
            </form>
        </div>
    );
}

export default LoginPage;
