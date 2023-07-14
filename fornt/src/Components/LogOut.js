import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookie from 'js-cookie';
import '../styles/all.css'
import '../styles/header.css'

export default function LogOut(){
    const navigate = useNavigate();


    const logOut = () =>{
        axios.get(`http://localhost:5000/logout`)
            .then(result =>{
                Cookie.remove('userToken' );
                localStorage.removeItem('userName');
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');

                navigate(result.data)
                window.location.reload()
            })
            .catch(err =>{
                console.log(err)
            })
    }
    return(
        <>
            <div className={'auth_link'} onClick={logOut} ><i className="fa-solid fa-right-to-bracket fa-rotate-180 fa-xl"></i></div>
        </>
    )
}