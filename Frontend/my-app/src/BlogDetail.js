import React, { useEffect, useState } from "react";
import './App.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Nav from './Nav';

const Blog_Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetchBlogDetail();
    }, [id]);

    const fetchBlogDetail = async () => {
        try{
            const response = await fetch(`https://patr-202b.onrender.com/postContent/${id}`);
            if(response.ok){
                const blogDetail = await response.json();
                setBlog(blogDetail);
                console.log('Blog detail fetched successfully.');
            }
            else{
                console.log('Failed to get blog detail from 4040 port.');
            }
        }
        catch(error){
            console.log('Error while fetching blog detail from 4040 port.', error);
        }
    }

    if (!blog) {
        return <h1 style={{textAlign: 'center'}}> Loading... </h1>
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
            <p> <b>Posted By - </b>{blog.username} </p>
            <p className="p"> {blog.content} </p>
        </div>
        </>
    );
}

export default Blog_Detail;