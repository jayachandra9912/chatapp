import React from 'react'

const Search = () => {
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Find a user' />

            </div>
            <div className='userChat'>
                <img src='https://photosnow.org/wp-content/uploads/2024/04/whatsapp-dp-48.jpg' alt='' />
                <div className='userChatInfo'>
                    <span>Chandu</span>
                    <p>hello</p>

                </div>
            </div>
        </div>
    )
}

export default Search