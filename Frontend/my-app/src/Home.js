import React, { useEffect, useState } from "react";
import './App.css'
import { Link } from "react-router-dom";
import Nav from './Nav';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import Loader from './Loader';

const Home = () => {
    let username = localStorage.getItem('Username');
    const [contents, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try{
            const response = await fetch(`https://patr-202b.onrender.com/postContent`);
            if(response.ok){
                const blog_content = await response.json();
                setContent(blog_content);
                setLoading(false);
                console.log('User name fetch successfully');
            }
            else{
                console.log('Failed to get data from 4040 port.');
            }
        }
        catch(error){
            console.log('Error while fetching from 4040 port.', error);
            setLoading(false);
            setError(true);
        }
    }

    if(loading){
        return (
            <>
            <Nav/>
            <header>
                <h1> Welcome, {(username ? <span>{username}</span> : <span> Sir </span>)} </h1>
            </header>
            <Loader/>
            </>
        )
    }

    if(error){
        return (
            <>
            <Nav/>
            <h3 style={{textAlign: 'center', marginTop: '300px'}}> Error while fetching data from server. </h3>
            </>
        )
    }
        
    return (
        <>
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Helmet>
        <Nav/>
        <header>
            <h1> Welcome, {username ? <span>{username}</span> : <span> Sir </span>} </h1>
        </header>
        <div className="content">
            {
                contents.map((content) => (
                    <div className="box" key={content._id}>
                        <Link className="link" style={{textDecoration: 'none', color: 'black'}} to={`/blog_detail/${content._id}`}>
                            <img src={content.image} className="thumbnail"></img>
                            <h3> {content.options} </h3>
                            <h2> {content.heading} </h2>
                            <p> <b>From - </b> {content.username} </p>
                        </Link>
                    </div>
                ))
            }
        </div>
        <Footer/>
        </>
    );
}

export default Home;