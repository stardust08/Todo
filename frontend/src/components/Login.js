import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { login } from "../store/authSlice";
import  Spinner  from './Spinner';




const Login = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const isLoading = useSelector(state => state.auth.isLoading);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData))

    };

    if (isLoading) return (<Spinner />
    )
    if (isAuth) {
        
        navigate('/allTasks')}

    


        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <div className="w-full max-w-sm bg-white shadow-2xl rounded-lg p-14">
                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email  "
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="************"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required

                                />
                                <p className="text-red-500 text-xs italic">Please choose a password.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"

                                >
                                    Sign In
                                </button>

                                <Link to='/forgot' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                    Forgot Password
                                </Link>
                                <span>or</span>
                                <Link to='/signup' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>


            </>
        )
    }



export default Login