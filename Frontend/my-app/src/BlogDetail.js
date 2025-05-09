import React, { useEffect, useState } from "react";
import './App.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Nav from './Nav';
import Loader from './Loader';
import Avatar from 'boring-avatars';


const Blog_Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [storeComments, setStoreComment] = useState([]);
    const [comments, setComment] = useState('');
    let username = localStorage.getItem('Username');

    useEffect(() => {
        fetchBlogDetail();
    }, [id]);

    const fetchBlogDetail = async () => {
        try{
            // const response = await fetch(`http://localhost:4040/postContent/${id}`);
            const response = await fetch(`https://patr-202b.onrender.com/postContent/${id}`);
            if(response.ok){
                const blogDetail = await response.json();
                setBlog(blogDetail);
                setStoreComment(blogDetail.comments || [])
                console.log('Blog detail fetched successfully.');
            }
            else{
                console.log('Failed to get blog detail from 4040 port.');
            }
        }
        catch(error){
            console.log('Error while fetching blog detail from server.', error);
        }
    }

    const PostBlogComment = async (event) => {
        event.preventDefault();
        try{
            // const response = await fetch(`http://localhost:4040/postContent/${id}`, {
            const response = await fetch(`https://patr-202b.onrender.com/postContent/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comments, username })
            });

            if(response.ok){
                console.log('Blog comments posted successfully.');
                setComment("");
                fetchBlogDetail();
            }
            else{
                console.log('Failed to post blog comments from server.');
            }
        }
        catch(error){
            console.log('Error while posting blog comments from server.', error);
        }
    }

    if (!blog) {
        return (
            <>
            <Nav/>
            <div style={{marginTop: '300px'}}>
                <Loader/>
            </div>
            </>
        )
    }

    return(
        <>
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Helmet>
        <Nav/>
        <div className="blogDetail">
            <h1> {blog.heading} </h1>
            <h2> {blog.options} </h2>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p> <b>Posted By - </b>{blog.username} </p>
                <p> <b>Posted At - </b>{blog.createdAt.split('T')[0]} </p>
            </div>
            <img src={blog.image}></img>
            <p className="p"> {blog.content} </p>
        </div>

        <div className="comments">
            <h1 style={{borderBottom: '1px solid black', padding: '0px 0px 20px 0px'}}> Comments: </h1>
            {
                storeComments.map((comment, index) => (
                    <div id="content" key={index}>
                        <div>
                            <Avatar className="img" size={40} name={username} variant="bauhaus"/>
                        </div>
                        <div>
                            <p> <b> {comment.username} </b>  </p>
                            <p> {comment.comment} </p>
                        </div>
                    </div>
                ))
            }
        </div>
        
        {
            username != null ? (
                <form className="addComment" onSubmit={PostBlogComment}>
                    <input required name="comments" style={{backgroundColor: 'white', border: '2px solid black', color: 'black'}} type="text" placeholder="Like it? Write a comment to tell them." onChange={(event) => setComment(event.target.value)}></input>
                    <button type="submit"> Post </button>
                </form>
            ) 
            : (
                <p style={{textAlign: 'center', fontSize: '16px'}}> Kindly <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigate('/signin')}> Sign In </span> to send comments </p>
            )
        }
        </>
    );
}

export default Blog_Detail;