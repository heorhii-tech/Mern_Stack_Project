import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate, Link} from "react-router-dom";
import Header from "./Header";
import '../styles/fullPage.css'
import DeleteComment from "./DeleteComment";

const FullPage = () => {
    const [title, setTitle] = useState([]);
    const [desc, setDesc] = useState([]);
    const [owner, setOwner] = useState([]);
    const [time, setTime] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [err, setErr] = useState("");
    const [comments, setComments] = useState([]);
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/fullPage/${id}`)
            .then((result) => {


                let res = result.data.posts;
                let comments = result.data.comments;

                setTitle(res.title);
                setOwner(res.owner);
                setDesc(res.desc);
                setTime(res.creat_at);
                setComments(comments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const commentChange = (e) => {
        setErr("");
        setNewComment(e.target.value);
    };
    const commentSubmit = (e) => {
        e.preventDefault();
        setErr("");
        if (newComment === "") {
            setErr("Field is required");
        } else {
            axios
                .post(`http://localhost:5000/addComment/${id}`, {
                    txt: newComment,
                    user: userId,
                    question: id,
                    userName: userName,
                })
                .then(() => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });

        }

    };
    const deleteQuestion = () => {
        axios
            .post(`http://localhost:5000/delete_question/${id}`)
            .then((result) => {
                navigate(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header/>
            <section className="posts_section">
                <div className="container">
                    <div className="post_fullpage_wrapper">
                        <p className={'time'}>Time: {time}</p>
                        <img
                            src="https://traveller-eu.ru/sites/default/files/styles/main_img/public/02-Zaanse-Schans-Holland-Netherlands-travel-photography-800x533.webp?itok=OJJMDEJu"
                            alt=""/>
                        <h3 className="post_fullpage_title">Title :{title}</h3>

                        <p className="post_fullpage_desc">Desc : {desc}</p>


                        {userId === owner ? (
                            <div className={'buttons_fullpage'}>

                                <Link to={`/edit_page/${id}`}>
                                    <button>
                                        <i className="fa-regular fa-pen-to-square fa-xl"></i>
                                    </button>
                                </Link>

                                <button onClick={deleteQuestion} className=''>
                                    <i className="fa-solid fa-trash fa-xl"></i>
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <hr className={'split'}/>
                </div>
            </section>
            <section className="addComment_section">
                <div className="container">
                    <form className={'form_comment'} onSubmit={commentSubmit}>
                        <input maxLength={50} name="txt" onChange={commentChange}></input>
                        <button className='edit_delete_comment_button' onClick={commentSubmit}>
                            Comment
                        </button>
                        {err ? <h5 className="error">{err}</h5> : null}
                    </form>
                </div>
            </section>
            <section>

                <div className="container">

                    {comments  && comments.map((comment) =>

                            comment.fromPost && comment.fromPost._id === id ?  (
                                <div className={'comment_wrapper'} key={comment._id}>
                                    <h4>{comment.comment}</h4>
                                    <div className={'comment_user_wrapper'}>

                                      <p>{comment.userName}</p>
                                        <p>{comment.creat_at}</p>

                                      {comment.owner._id === userId && <DeleteComment id={comment._id}/>}
                                    </div>


                                </div>
                            ) : null
                        )}


                </div>

            </section>
        </>
    );
};
export default FullPage;
