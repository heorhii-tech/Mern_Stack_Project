import React, {useEffect, useState} from 'react'
import  {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import '../styles/signupPage.css'


export default function SignUpPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [err, setErr] = useState('')


    const userEmailChange = (e) =>{
        setErr('')
        setUserEmail(e.target.value)
    }
    const userPasswordChange = (e) =>{
        setErr('')
        setUserPassword(e.target.value)
    }
    const userNameChange = (e) =>{
        setErr('')
        setUserName(e.target.value)
    }
    const signUpSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (userName === '' || userEmail === '' || userPassword === ''){
            setErr("Email and password are required")
        }else if (userName.length<2 || userName.length>20 ){
            setErr("User Name min length 2 max length 20")
        }else if(userPassword.length<6 || userPassword.length>20){
            setErr("Password min length 6 max length 20")

        }
        else{
            axios.post(`http://localhost:5000/signup`,{
                userName: userName,
                email: userEmail,
                password: userPassword
            })
                .then(
                        navigate(`/login`)
                )
                .catch(err =>{
                    console.log(err)
                })
        }
    }


    return (
        <>
         <Header />
        <section className={'signup_section'}>

            <div className="container">
                <div className="signup_main_wrapper">
                    <form onSubmit={signUpSubmit} className="signup_form">
                        <div className="signup_welkome"><h3>Welkome</h3></div>
                        <h2>Sign Up</h2>
                        <div><i className="fa-regular fa-face-smile fa-2xl smile"></i></div>


                        <input type="text" name="userName" placeholder="Username" onChange={userNameChange}/>
                        <input type="email" name="email" placeholder="Email" onChange={userEmailChange}/>
                        <input type="password" name="password" placeholder="Password" onChange={userPasswordChange} autoComplete="off" />
                        < button onClick={signUpSubmit} className="button-login">Sign Up</button>
                        {
                            err ? <h5 className="error">{err}</h5> : null
                        }
                    </form>

                </div>
            </div>

        </section>
        </>
    )
}

