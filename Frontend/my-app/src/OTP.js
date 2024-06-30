// I HAVE ALREADY CREATED MY ACCOUNT SO WE FONT NEED TO MAKE ANOTHER ONE
// Email: hsdhanjal2003@gmail.com

import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";

const OTP = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [otp, setOTP] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    let login = localStorage.getItem('Login');
    
    const handleSendOTP = async () => {
      try {
        const response = await fetch('https://patr-202b.onrender.com/otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp, username }),
        });
    
        if (response.ok) {
          const data = await response.json();
          // Check the response status or data for successful login
          if (data.message === "Login Successful") {
            console.log('Login Successful');
            
            let otpm = document.getElementById("otpm");
            otpm.style.display = "block";
            
            let otpi = document.getElementById("otpi");
            otpi.style.display = "block";
            
            let otp = document.getElementById("otp");
            otp.style.display = "block";

            let otpb = document.getElementById("otpb");
            otpb.style.display = "block";
            setOtpSent(true);

            let name = localStorage.setItem('Username', username);
            console.log(username);

            let server_error = document.getElementById("server_error");
            server_error.style.display = "none";
            let user_error = document.getElementById("user_error");
            user_error.style.display = "none";
          } 
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

    const handleVerifyOTP = async () => {
      try {
        const response = await fetch('https://patr-202b.onrender.com/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, otp }),
        });
    
        if (response.ok) {
          const data = await response.json();
  
          // Check the response status or data for successful login
          if(data.message === "OTP Successful"){
            let otp_success = document.getElementById("otp_success");
            otp_success.style.display = "block";
            let otp_error = document.getElementById("otp_error");
            otp_error.style.display = "none";
            console.log('OTP is correct');
            localStorage.setItem('Login', 'true');
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
          else{
            let otp_error = document.getElementById("otp_error");
            otp_error.style.display = "block"
            console.log('OTP is wrong');
            localStorage.setItem('Login', 'false');
          }
        } 
        else {
          console.error('Invalid OTP');
          let otp_error = document.getElementById("otp_error");
          otp_error.style.display = "block";
          let otp_success = document.getElementById("otp_success");
          otp_success.style.display = "none";
          localStorage.setItem('Login', 'false');
          
        }
      } 
      catch (error) {
        console.error('Error fetching the user data: ', error);
        let server_error = document.getElementById("server_error");
        server_error.style.display = "block";
      //   links('/Error');
      }
    }

    
    const handleLogin = async (event) => {
      event.preventDefault();
      if(!otpSent){
        handleSendOTP();
      }
      else{
        handleVerifyOTP();
      }
    };

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
            <form onSubmit={handleLogin}>
              <h2> Sign In: </h2>
              <input id="email" type="text" name="email" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)}></input><br></br><br></br>
              <input id="username" type="text" name="username" placeholder="Enter Username" onChange={(event) => setUsername(event.target.value)}></input><br></br><br></br>
              <a href="/signup"> Sign Up? </a>
              <br></br><br></br><br></br>
              <button id="button" type="submit"> Proceed </button>
              <p id="user_error" style={{display: "none"}}> Invalid Email or Username. </p>
              <p id="server_error" style={{display: "none"}}> Server Error. </p>
              
              <h5 style={{display: 'none'}} id="otpm"> An OTP is sent on this email </h5>
              <h2 style={{display: 'none'}} id="otp"> OTP: </h2>
              <input style={{display: 'none'}} id="otpi" type="text" name="otp" placeholder="Enter OTP" onChange={(event) => setOTP(event.target.value)}></input>
              <br></br><br></br>
              <button style={{display: 'none'}} id="otpb" type="submit"> Sign In </button>
              <p id="otp_error" style={{display: "none"}}> Invalid OTP </p>
              <p id="otp_success" style={{display: "none"}}> Verified. Enjoy :) </p>
            </form>
          </div>
        </div>
        </>
    )
};

export default OTP;