require('dotenv').config();
const mongoose = require('mongoose');

const database = require("./Database");
const express = require("express");

const admin = require("./admin");
const cors = require("cors");
database();

const connection = {
    // origin: 'http://localhost:3000',
    origin: 'https://patr.netlify.app',
    credentials: true
};

const app = express();
app.use(cors(connection));

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
      // const request = await fetch(`http://localhost:4040`, {
      const request = await fetch('https://patr-202b.onrender.com', {
          method: "POST",
          mode: "cors",
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // 'Access-Control-Allow-Origin': 'http://localhost:3000'
              'Access-Control-Allow-Origin': 'https://patr.netlify.app'
          }
      });
      if(request.ok){
          console.log("Server Connected!");
      }
      else{
          console.log("Request Error!");
      }
  }
  catch(error){
      console.log(`Error occurred: ${error}`);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server is ON, and running at PORT: ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Server is ON");
});

// -------- THIS IS FOR SIGN UP --------

app.post("/signup", async function (req, res) {
  try{
      const user = await admin.create({
          email: req.body.email,
          name: req.body.name,
          username: req.body.username
      });

      // Send a success response
      res.status(201).json({ message: "Form submitted successfully", user });
  }
  catch(error){
      console.log(`Error while sending data to form's backend (MongoDB): ${error}`);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// -------------------------------------

// ---- BELOW CODE IS FOR GENERATING OTP ----
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const otpMap = {};
const otpExpiryMap = {};


function generateOTP(){
  return Math.floor(100000 + Math.random() * 900000);
}
  
async function sendOTP(email, otp){
    try{
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
          
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your OTP for PATR',
          // text: ` OTP for PATR is ${otp}. Please don't share it for security reason.`,
          html: `<p> Your OTP for <b style='color: 'rgb(153, 255, 0)''> PATR </b> is <span style='text-decorator: 'underline''> ${otp} </span></p>`
        });
        // console.log(`OTP sent to ${email}: ${otp}`);
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}

// ------------------------------------------

// ------ THIS IS FOR SIGN IN ------

app.post('/otp', async(req, res) => {
    const otp = generateOTP();
    const { email, username } = req.body;
    otpMap[email] = otp;
    otpExpiryMap[email] = Date.now() + 300000;  // OTP valid for 5 minutes
    
    try{
      const user = await admin.findOne({ email, username });
      if(user){
        if(email == user.email && username == user.username){
          otpMap[user.email] = otp;
          await sendOTP(email, otp);
          res.status(200).json({ message: "Login Successful", user});
        }
        else{
          res.status(401).json({ message: "Incorrect Password!" });
        }
      }
      else{
        res.status(401).json({ message: "Invalid Username" });
      }
    }
    catch(error){
      console.error('Error sending OTP:', error);
      res.status(500).json({error: "ERROR:500. SERVER IS OFFLINE. KINDLY TRY LATER"});
    }
});

app.get('/otp', async (req, res) => {
    try{
        const user = await admin.find({});
        if(user){
            res.json(user);
        }
    }
    catch(error){
        res.status(500).json({error: 'Internal server error'});
    }
});

app.post('/verify', async (req, res) => {
    const { email, otp } = req.body;
    const storedOTP = otpMap[email];
    const otpExpiry = otpExpiryMap[email];

    // console.log(`Verifying OTP for ${email}`);
    // console.log(`Stored OTP: ${storedOTP}`);
    // console.log(`Received OTP: ${otp}`);

    const currentTime = Date.now()
    // console.log(`OTP Expiry: ${otpExpiry}`);
    // console.log(`Request Body:`, req.body);

    try{
      if (!storedOTP) {
        console.log('No OTP found for this email');
        return res.status(401).json({ message: 'OTP not found' });
      }
  
      if(currentTime > otpExpiry){
        delete otpMap[email];
        delete otpExpiryMap[email];
        console.log('OTP Expired');
        return res.status(401).json({error: 'OTP Expired'});
      }
      
      if(otp.toString().trim() === storedOTP.toString().trim()){
        res.status(200).json({ message: 'OTP Successful' });
        console.log('OTP Successful');
        delete otpMap[email];
        delete otpExpiryMap[email];
      } 
      else {
        // If OTP does not match or expired, deny sign in
        res.status(401).json({ error: 'Invalid OTP' });
        console.log('Invalid OTP');
      }
    }
    catch(error){
      console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ---------------------------------

// -------- ACCOUNT PAGE BACKEND --------

app.get("/otp/:username", async (req, res) => {
  try {
    // Query MongoDB to fetch only sign in teacher document at a time
    const username = req.params.username;
    const user = await admin.findOne({ username });
    // Send the fetched data as JSON response
    if(user){
      res.json(user);
    }
    else {
      res.status(404).json({ error: "User not found" });
    }
  } 
  catch (error) {
    console.error(`Error while fetching user's data: ${error}`);
    // Send an error response if something goes wrong
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --------------------------------------


// -------- BLOG CREATE POST PAGE BACKEND -------

const post = require("./postData");
app.post('/postContent', async (req, res) => {
  try{
    const post_blog = await post.create({
      options: req.body.options,
      heading: req.body.heading,
      content: req.body.content,
      comments: req.body.comments,
      username: req.body.username,
      image: req.body.image
    });
    
    //  FOR IMAGE (DECOING THE IMAGE'S DATA)
    const {image} = req.body;
    if(image){
      const base64Data = image.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
    }

    res.status(200).json({ message: "Blog posted successfully", post_blog });
    console.log('Blog Posted');
  }
  catch(error){
    res.status(500).json({error: "ERROR:500. SERVER IS OFFLINE. KINDLY TRY LATER"});
    console.log('Blog did not Posted', error);
  }
});

// ----------------------------------------------

// -------- BLOG HOME PAGE BACKEND -------

app.get('/postContent', async(req, res) => {
  try{
    const postContent = await post.find({});
    if(postContent){
      res.json(postContent);
    }
  }
  catch(error){
      res.status(500).json({error: 'Internal server error'});
    }
  });
        
// ---------------------------------------

// -------- BLOG DETAIL PAGE --------

app.get('/postContent/:id', async(req, res) => {
  try{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
   }

    const postContent = await post.findById(id);
    if(postContent){
      res.json(postContent);
    }
    else{
      res.status(404).json({ error: 'Blog not found' });
    }
  }
  catch(error){
    console.error('Error fetching post:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

// BACKEND FOR POSTING BLOG DETAIL COMMENTS

app.post('/postContent/:id', async(req, res) => {
  try{
    const { id } = req.params;
    const { comments, username } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
   }

    const postComment = await post.findByIdAndUpdate(
      id,
      { $push: { comments: { username, comment: comments } } },
      { new: true }
    );

    res.status(200).json({ message: "Blog Comment posted successfully ", postComment});
  }
  catch(error){
    console.log('Error in server: ', error);
  }
});

// ----------------------------------