import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";

// ERROR 404 PAGE
import Error from './Error.js'

// OTP
import OTP from './OTP.js';

// SIGN UP
import SignUp from './SignUp.js';

// Home Page
import Home from './Home.js';

// Account Page
import Account from './Account.js'

// Create Post Page
import Create_Post from './CreatePost.js'

// Create Blog Detail Page
import Blog_Detail from './BlogDetail.js'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* OTP Practice */}
        <Route path="signup" element={<SignUp/>} />
        <Route path="/signin" element={<OTP/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/user_account/:username" element={<Account/>} />
        <Route path="/create_post" element={<Create_Post/>} />
        <Route path="/blog_detail/:id" element={<Blog_Detail/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;