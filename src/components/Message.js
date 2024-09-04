import React from 'react'

const Message = () => {
    return (
        <div className='message owner'>
            <div className='messageInfo'>
                <img src='https://i.pinimg.com/736x/58/bd/4f/58bd4fc9ebfccc1f2de419529bbf1a12.jpg' alt='' />
                <span>Just now</span>
            </div>
            <div className='messageContent'>
                <p>hello</p>
                <img src='https://i.pinimg.com/736x/58/bd/4f/58bd4fc9ebfccc1f2de419529bbf1a12.jpg' alt='' />
            </div>
        </div>
    )
}

export default Message