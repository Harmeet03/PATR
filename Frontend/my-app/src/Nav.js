import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Nav = ({username}) => {
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
        <nav>
            <div>
                <h1> PATR </h1>
            </div>
            <div className="list">
                <div className="toggle" onClick={() => {
                    let list = document.getElementById('list');
                    if(list.style.display == 'flex'){
                        list.style.display = 'none';
                    }
                    else{
                    }
                }}>
                    <span>____</span>
                    <span>____</span>
                    <span>____</span>
                </div>
                <div id="list">
                    <a onClick={() => {Link(`/`)}}> Home </a>
                    {
                        localStorage.getItem('Login', 'true') ? (
                            <div>
                                <a onClick={() => {Link(`/create_post`)}}> Create Post </a>
                                <a  onClick={() => {Link(`/user_account/${username}`)}}> Account </a>
                                {/* <a href='/signin' onClick={() => {localStorage.removeItem('Login')}}> Sign Out </a> */}
                            </div>
                        ) 
                        : (
                            <a href='/signin'> Sign In </a>
                        )
                    }
                </div>
            </div>
        </nav>
        </>
    );
}

export default Nav;