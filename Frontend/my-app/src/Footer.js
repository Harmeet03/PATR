import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const Link = useNavigate();
  return(
        <>
        <footer style={{backgroundColor: 'rgb(32,20,20)', color: 'white', margin: 0, padding: '20px 0px', textAlign: 'center'}}>
            <div className="left">
                <h1 style={{color: 'white'}}> PATR </h1>
            </div>
            <div className="right">
                <p> This website is for demonstration of my skills purpose only. No copyright intended </p>
            </div>
        </footer>
        </>
    )
}

export default Footer;