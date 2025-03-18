import { useState } from "react";
import "./App.css";
import {  BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import ArticlePage from "./Pages/ArticlePage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Pages/Loader";
import Carousel from "./Components/Carousel";
import SignIn from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { SearchProvider } from "./Contexts/SearchContext";
// import { DarkModeProvider } from "./Contexts/ThemeContext";



function App() {



  return (
  
    <BrowserRouter>
 
     <SearchProvider>
       <Navbar/>
  
      <Carousel/>
     
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/article/:id" element={<ArticlePage/>} />
        <Route path="*" element={<Loader/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        < Route path="/sign-up" element={<Signup/>} />
        

      </Routes>
      <Footer/>
      </SearchProvider>
   
    </BrowserRouter>
   
    
  );
}

export default App;
