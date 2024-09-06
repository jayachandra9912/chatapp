import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import Add from '../img/addAvatar.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;


        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/chatapp")
        } catch (err) {
            setErr(true);
            // setLoading(false);
        }
    };
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chandu's Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>

                    <input type='email' placeholder='Email'></input>
                    <input type='password' placeholder='Password'></input>

                    <button>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Do you don't an account?<Link to='/chatapp/register'>Register</Link> </p>
            </div>
        </div>
    )
}

export default Login