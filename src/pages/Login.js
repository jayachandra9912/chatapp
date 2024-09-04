import React from 'react'
// import Add from '../img/addAvatar.png'

const Login = () => {
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chandu's Chat</span>
                <span className='title'>Login</span>
                <form>

                    <input type='email' placeholder='Email'></input>
                    <input type='password' placeholder='Password'></input>

                    <button>Sign In</button>
                </form>
                <p>Do you don't an account? Register</p>
            </div>
        </div>
    )
}

export default Login