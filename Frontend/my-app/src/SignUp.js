import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import image from "./Images/image1.png"

const OTP = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('https://patr-202b.onrender.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, username, name }),
        });
    
        if (response.ok) {
          let created = document.getElementById("created");
          created.style.display = "block";

          let server_error = document.getElementById("server_error");
          server_error.style.display = "none";

          let user_error = document.getElementById("user_error");
          user_error.style.display = "none";
          
          setTimeout(() => {
            navigate('/signin');
          }, 1000);
        } 
        else {
          console.error('Invalid Email');
          let user_error = document.getElementById("user_error");
          user_error.style.display = "block";
        }
      } 
      catch (error) {
        console.error('Error fetching the user data: ', error);
        let server_error = document.getElementById("server_error");
        server_error.style.display = "block";
      //   links('/Error');
      }
    }

    return(
        <>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@300&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </head>
        <div className="si">
          <div className="left">
            <img src={image}/>
          </div>
          <form onSubmit={handleSubmit}>
            <span style={{textAlign: 'left', cursor: 'pointer'}} onClick={() => {navigate('/')}}> Back </span>
            <h1> Sign Up: </h1>
            <input required id="email" type="text" name="email" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)}></input>
            <input required id="username" type="text" name="username" placeholder="Enter Username" onChange={(event) => setUsername(event.target.value)}></input>
            <input required id="name" type="text" name="name" placeholder="Enter Name" onChange={(event) => setName(event.target.value)}></input>
            <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {navigate(`/signin`)}}> Sign In? </a>
            <button id="button" type="submit"> Sign Up </button>
            <p id="created" style={{display: "none"}}> Account Created. </p>
            <p id="user_error" style={{display: "none"}}> Email or Username already exists. </p>
            <p id="server_error" style={{display: "none"}}> Server Error. </p>
            <br></br><br></br>
          </form>
        </div>
        </>
    )
};

export default OTP;