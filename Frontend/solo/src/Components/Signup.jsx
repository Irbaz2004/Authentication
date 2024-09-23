import React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function Signup() {
  const [signupform, setsignupform] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupform({ ...signupform, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signupform.password !== signupform.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupform),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Frontend', data);

      toast.success("Account created successfully!", {
        className: "toast-message",
      });

      setTimeout(() => {
        navigate(window.location.href='https://www.google.co.in/'  )
      }, 2000); 

    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`); 
    }  
  };

  return (
    <>
      <ToastContainer /> 
      <div className="Parent_All">
        <div className="form_component">
          <h3>SoloGalaxy</h3>
          <h2>Create New Account</h2>
          <h5>Start for free</h5>

          <p>Already have an account? 
            <Link to={'/login'}>Sign In</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name:</label>
            <input 
              type="text" 
              name="name" 
              value={signupform.name} 
              onChange={handleChange} 
              placeholder='Enter Your Name' 
              required 
            />
            
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={signupform.email} 
              onChange={handleChange} 
              placeholder='Enter Your Email' 
              required 
            />
            
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              name="password" 
              value={signupform.password} 
              onChange={handleChange} 
              placeholder='Enter Password' 
              required 
            />
            
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={signupform.confirmPassword} 
              onChange={handleChange} 
              placeholder='Enter Confirm Password' 
              required 
            />
            
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="from_side_img">
        <h2 className='name'> Welcome to SoloGalaxy</h2>
        <h2>Exploring the Cosmos</h2>
        <h5 className='content'>SoloGalaxy is an exciting project that explores the vast wonders of the universe, diving deep into the mysteries of planets, stars, and cosmic phenomena. SoloGalaxy aims to captivate curiosity and inspire a sense of awe about our universe.</h5>
        
        </div>
      </div>
    </>
  );
}
