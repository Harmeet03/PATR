import React, { useEffect, useState } from "react";
import './App.css'
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Nav from './Nav'

const Account = () => {
    const username = localStorage.getItem('Username');
    const [user, setData] = useState('');

    useEffect(() => {
        if(username){
            fetchUserData(username);
        }
    }, [username]);

    const fetchUserData = async (username) => {
        try{
            const response = await fetch(`http://localhost:4040/otp/${username}`);
            if(response.ok){
                const userData = await response.json();
                setData(userData);
                console.log(username);
            }
            else{
                console.log('Error during connection. ');
            }
        }
        catch(error){
            console.error('Error fetching user data: ', error);
        }
    }
    
    const Link = useNavigate();
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
        <Nav username = {username}/>
        <div className="account">
            <img src=""></img><br></br>
            <h2> {user.name} </h2>
            <h3> {user.email} </h3><br></br>
            <a href="/signin" onClick={() => {localStorage.removeItem('Login'); localStorage.removeItem('Username');}}> Sign Out? </a>

            <div className="myBlog" id="myBlog">
                <h1> My Blogs: </h1>
                <div>
                    <h3> NAME OF THE HEADING OF BLOG </h3>
                    <button> Edit </button>
                    <button> Delete </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Account;