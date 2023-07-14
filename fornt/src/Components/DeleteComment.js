import axios from "axios";
import React from "react";
import '../styles/all.css'


export default function DeleteComment(props){

    const deleteComment = () =>{
        axios.post(`http://localhost:5000/deleteComment/${props.id}`)
            .then(() =>{
                window.location.reload()
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
        <div  onClick={deleteComment}>
            <i className="fa-solid fa-trash fa- hover"></i>
        </div>
    )
}