import React, { useState } from "react";
import './App.css'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Nav from './Nav';

const Create_Post = () => {
    let username = localStorage.getItem('Username');
    const Link = useNavigate();
    const [options, setOption] = useState('');
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        //  FOR IMAGE (ENCODING THE IMAGE'S DATA)
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
    
        if(file){
            reader.readAsDataURL(file);
        }
    };

    const handlePost = async (event) => {
         event.preventDefault();
        try{
            const response = await fetch(`https://patr-202b.onrender.com/postContent`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ options, heading, content, username, image }),
            });

            if(response.ok){
                console.log("OK");
                let success = document.getElementById('success');
                success.style.display = 'block';
                
                let failed = document.getElementById('failed');
                failed.style.display = 'none';

                Link('/');
            }

            else{
                let success = document.getElementById('success');
                success.style.display = 'none';
                
                let failed = document.getElementById('failed');
                failed.style.display = 'block';

            }
        }
        catch(error){
            console.error('Internal Server Error: ', error);
        }
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
        <form className="post" onSubmit={handlePost}>
            <h2> Create Post </h2>
            <select className="option" name="options" required onChange={(event) => setOption(event.target.value)}>
                <option value=''>Select Category</option>
                <option>Travel</option>
                <option>Technology</option>
                <option>Health</option>
                <option>Food</option>
                <option>Lifestyle</option>
                <option>Fashion</option>
                <option>Music</option>
                <option>Social Media</option>
            </select><br></br><br></br>
            <input name="heading" type="text" placeholder="Write your blog's heading" minLength={1} maxLength={80} required onChange={(event) => setHeading(event.target.value)}></input><br></br><br></br>
            <textarea name="content" type="text" className="desc" placeholder="Start writing your blog here" minLength={100} maxLength={10000} required onChange={(event) => setContent(event.target.value)}></textarea><br></br><br></br>
            <div className="upload" style={{backgroundColor: 'white'}}>
                <p>UPLOAD IMAGE FOR THUMBNAIL:</p>
                <input name="image" type="file" accept="image/*" required onChange={handleImage}/>
            </div><br></br>
            <p className="uname"> Username: <span name="username"> {username} </span></p>
            {/* <input type="file"></input> */}
            <button type="submit">Publish Post</button>
            <p id="success" style={{display: 'none'}}> Posted. :) </p>
            <p id="failed" style={{display: 'none'}}> Connection Problem :( </p>
        </form>
        </>
    );
}

export default Create_Post;