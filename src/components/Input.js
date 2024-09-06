import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Input = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const [img, setImg] = useState(null)

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid())


            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL

                            })
                        })

                    } catch (err) {
                        console.log(err);
                        // setErr(true);
                        // setLoading(false);
                    }
                });
            });

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),

                }),
            });
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });
        setText("");
        setImg(null);

    }
    return (
        <div className='input'>
            <input type='text' placeholder='Type Something...' value={text} onChange={e => setText(e.target.value)} />
            <div className='send'>
                <img src={Attach} alt='' />
                <input type='file' style={{ display: 'none' }} id='file' onChange={e => setImg(e.target.files[0])} />
                <label htmlFor='file'>
                    <img src={Img} alt='' />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input