import React, { useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from "../context/auth" 
import { AlertContext } from "../context/alert" 
import { Link } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const context = useContext(AuthContext); 
    const alertContext = useContext(AlertContext); 
    const {authTokenStore} = context;
    const {showAlert} = alertContext;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3002/api/auth/login', user);
            const authToken = response.data.authToken;
            setIsLoading(false);
            showAlert('Successfully logged in');           
            authTokenStore(authToken); 
        } catch (error) {
            setIsLoading(false)
            showAlert(error.response.data.error);
            // setIsError(true)
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    if (isLoading) return (<div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>)
    if (isError) return (<h4>Some thing went wrong...</h4>)

    return (
        <div>
            <div className='container'>
                <h3 className='mt-3 text-center'>Login Form </h3>
                <div className='d-flex justify-content-center'>
                    <form onSubmit={handleSubmit} className='row my-3 shadow p-3 mb-5 bg-body rounded' style={{ width: "38%" }} >
                        <div>
                            <input type="email" className="form-control my-3" id="email" name="email" placeholder='Email' onChange={handleChange} />
                        </div>
                        <div>
                            <input type="password" className="form-control my-3" id="password" name="password" placeholder='Password' onChange={handleChange} />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary my-2 w-100">Login</button>
                        </div>
                        {/* <h6 className='text-center'> OR </h6> */}
                        <div>
                            {/* <button type="submit" className="btn btn-primary my-2 w-100">Signup</button> */}
                           <Link  to = "/signup"><p className=' font-weight-bold text-center text-decoration-underline'>Create New Account</p>
                           </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;



