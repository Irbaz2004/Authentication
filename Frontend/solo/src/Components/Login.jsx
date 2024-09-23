import React from 'react'
import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function Login() {
    const [loginformdata,setLoginformdata]=useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleLoginFormChange=(e)=>{
        setLoginformdata({...loginformdata,[e.target.name]:e.target.value})
        console.log('fjkfj',loginformdata)
    }
    const handleLoginSubmit=async(e)=>{
      e.preventDefault()
      console.log(loginformdata)


      try{
        const response=await fetch('http://localhost:3000/login',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(loginformdata)
        })
        if(!response.ok){
          const errorData=await response.json()
          throw new Error(errorData.message)
        }
        const data=await response.json()    
        toast.success("Logged Into Your Account",{
          className: "toast-message",
        });
        navigate(window.location.href='https://www.google.co.in/'  )
      }

      
      catch(error){
        toast.error(`Error: ${error.message}`,{
          className: "toast-message",
        });
      }


      setLoginformdata({
        email:'',
        password:''
      })
    }
  return (
    <>
    <ToastContainer />
       <div className="Parent_All">
      <div className="form_component">
        <h3>SoloGalaxy</h3>
        <h2>Login To Your Account</h2>
        <h5>Premium Membership</h5>
        <p>If Don't have Account <Link to={'/'}><a href="#">Sign Up</a></Link></p>
        <form className='login_form' onSubmit={handleLoginSubmit}> 
         
          <label htmlFor="">Email:</label>
          <input type="email" name="email" value={loginformdata.email} onChange={handleLoginFormChange} placeholder='Enter Your Email' required />
          
          <label htmlFor="">Password:</label>
          <input type="password" name="password" value={loginformdata.password} onChange={handleLoginFormChange} placeholder='Enter Password' required />
          
        
         <button>Log In</button>
          </form>
      </div>
      <div className="from_side_img">
      <h2 className='name'> Welcome to SoloGalaxy</h2>
        <h2>Exploring the Cosmos</h2>
        <h5 className='content'>SoloGalaxy is an exciting project that explores the vast wonders of the universe, diving deep into the mysteries of planets, stars, and cosmic phenomena. SoloGalaxy aims to captivate curiosity and inspire a sense of awe about our universe.</h5>
        
      </div>
    </div>
      
    </>
  )
}
