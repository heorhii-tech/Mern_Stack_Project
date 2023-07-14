import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

import '../styles/questionPage.css'

const EditPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState([]);
    const [desc, setDesc] = useState([]);
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const [err, setErr] = useState("");

    const titleChange = (e) => {
        setErr("");
        setTitle(e.target.value);
    };
    const descChange = (e) => {
        setErr("");
        setDesc(e.target.value);
    };
    const editSubmit = (e) => {
        e.preventDefault();
        setErr("");
        if (title === "" || desc === "") {
            setErr("Title and Description should not be empty");
        } else if (title.length < 2 || title.length > 60) {
            setErr("Title min length 2, max length 60");
        }  else {
            axios
                .post(`http://localhost:5000/addNewQuestion`, {
                    title: title,
                    desc: desc,
                    userId: userId,
                })
                .then(navigate(`/`))
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <Header/>
            <section className="posts_section">
                <div className="container">
                    <h2>Add your question</h2>

                    <form onSubmit={editSubmit} className="form_edit">
                        <p className='post_title'>Title:</p>
                        <input type="text" name="title" onChange={titleChange}/>
                        <br/>
                        <p className='post_title'>Description:</p>
                        <textarea
                            name="desc"
                            cols="40"
                            rows="10"
                            onChange={descChange}
                        ></textarea>
                        <br/>
                        <button onClick={editSubmit} className='edit_delete_comment_button'>
                            <i className="fa-sharp fa-regular fa-paper-plane fa-xl"></i>Send
                        </button>
                    </form>

                    {err ? <h5 className="error">{err}</h5> : null}
                </div>
            </section>
        </>
    );
};
export default EditPage;
