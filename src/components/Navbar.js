import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>
                Chandu's Chat
            </span>
            <div className='user'>
                <img src='https://photosnow.org/wp-content/uploads/2024/04/whatsapp-dp-48.jpg' alt='' />
                <span>Chandu</span>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar