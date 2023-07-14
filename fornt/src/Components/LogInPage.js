
import React, {useEffect, useState} from "react";
import  {useNavigate} from "react-router-dom";
import axios from "axios";
import '../styles/loginPage.css'

import Cookie from 'js-cookie';
import Header from "./Header";
const LogInPage = () => {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [err, setErr] = useState('')

    const userEmailChange = (e) =>{
        setErr('')
        setUserEmail(e.target.value)
    };
    const userPasswordChange = (e) =>{
        setErr('')
        setUserPassword(e.target.value)
    };

    const loginSubmit = (e) => {
        e.preventDefault()
      

        setErr('')
        if (userEmail === '' || userPassword === '') {
            setErr("Email is required")
        } else if (userPassword === '') {
            setErr("Password is required")
        } else {
            axios.post(`http://localhost:5000/login`, {
                email: userEmail,
                password: userPassword
            })
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('userName', res.data.user.userName);
                        localStorage.setItem('userEmail', res.data.user.email);
                        localStorage.setItem('userId', res.data.user.id);
                        Cookie.set('userToken', res.data.token)
                        window.location.reload()


                        navigate('/')


                    }else {
                        setErr(res.data.error)
                    }

                })
                .catch(err=>{
                    console.log(err)

                })

        }



    }

    return(
        <>
            <Header />
           <section className={'login_section'}>
          <div className="container">
              <div className="login_wrapper">
                  <form onSubmit={loginSubmit} className="login_form">
                      <div className="signup_welkome"><h3>Welkome</h3></div>
                      <h2>Log In</h2>
                      <div><i className="fa-regular fa-face-smile fa-2xl smile"></i></div>
                      <input type="email" name="email" placeholder="Email" onChange={userEmailChange}/>
                      <input type="password" name="password" placeholder="Password" onChange={userPasswordChange} autoComplete="off" />
                      < button onClick={loginSubmit} className="button">Login</button>
                      {
                          err ? <h5 className="error">{err}</h5> : null
                      }
                  </form>
              </div>
          </div>

      </section>
        </>

    )

};

export default LogInPage;
