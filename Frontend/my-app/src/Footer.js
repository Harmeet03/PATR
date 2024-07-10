import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const Link = useNavigate();
    return(
        <>
        <footer style={{backgroundColor: 'black', color: 'white'}}>
            <div className="left">
                <h1 style={{color: 'rgb(153, 255, 0)'}}> PATR </h1>
            </div>
            <div className="right">
                <p> This website is for demonstration of my skills purpose only. No copyright intended </p>
            </div>
        </footer>
        </>
    )
}

export default Footer;