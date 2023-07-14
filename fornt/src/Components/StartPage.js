import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import './Header'
import Header from "./Header";
import '../styles/startPage.css'
import {Link} from "react-router-dom";
import '../styles/all.css'



const StartPage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/`)
            .then(result => {


                setPosts(result.data.allPosts)
            })
            .catch(err => {
                console.log(err)
            })
    }, [posts])

    return (
        <>
            <Header />
            <div className="add_question">

            </div>
         <section className={'posts_section'}>
            <div className="container">

                 <Link to={'/questionPage'}>
                     <div className="add">
                         <i className="fa-solid fa-plus fa-beat fa-2xl"></i>Add Question
                </div>
                 </Link>

                <div className="posts_main_wrapper">
                    {posts && posts.map(post =>
                        <div key={post._id} className="post_wrapper">
                            <div className="post_owner post_time">


                                <h4>{post.owner.userName}</h4>
                                <p>{post.creat_at}</p>

                            </div>
                            <img src="https://traveller-eu.ru/sites/default/files/styles/main_img/public/02-Zaanse-Schans-Holland-Netherlands-travel-photography-800x533.webp?itok=OJJMDEJu" alt=""/>
                            <Link to={`/fullPage/${post._id}`}> <h3 className={'post_title'}>Title: {post.title}</h3></Link>
                            <p className={'posts_desc'}>Desc: {post.desc}</p>
                            <hr className={'split'}/>


                                <Link  className={'comment'} to={`/fullPage/${post._id}`}><i className="fa-solid fa-comment fa-xl "></i>comment</Link>


                        </div>
                    )}
                </div>
            </div>
         </section>


        </>


    )


};

export default StartPage;

