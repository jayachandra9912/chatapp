import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {

    const [err, setErr] = useState(false)
    // const handleSubmit = async (e) => {
    //     const displayName = e.target[0].value;
    //     const email = e.target[1].value;
    //     const password = e.target[2].value;
    //     const file = e.target[3].files[0];


    //     try {
    //         const res = await createUserWithEmailAndPassword(auth, email, password);





    //         const storageRef = ref(storage, displayName);

    //         const uploadTask = uploadBytesResumable(storageRef, file);


    //         uploadTask.on(
    //             (error) => {
    //                 setErr(true)
    //             },
    //             () => {

    //                 getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //                     await updateProfile(res.user, {
    //                         displayName,
    //                         photoURL: downloadURL,
    //                     });
    //                     await setDoc(doc(db, "users", res.user.uid), {
    //                         uid: res.user.uid,
    //                         displayName,
    //                         email,
    //                         photoURL: downloadURL
    //                     })
    //                 });
    //             }
    //         );

    //     } catch (err) {
    //         setErr(true)
    //     }




    // }

    const handleSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            //   const date = new Date().getTime();
            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        // await setDoc(doc(db, "userChats", res.user.uid), {});
                        // navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        // setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            // setLoading(false);
        }
    };
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chandu's Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Display Name'></input>
                    <input type='email' placeholder='Email'></input>
                    <input type='password' placeholder='Password'></input>
                    <input type='file' id='file' style={{ display: 'none' }}></input>
                    <label htmlFor="file">
                        <img src={Add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Do you have an account? Login</p>
            </div>
        </div>
    )
}

export default Register