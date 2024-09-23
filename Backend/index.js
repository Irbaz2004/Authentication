require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookiess = require('cookie-parser'); 
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookiess());





const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;



mongoose.connect('mongodb://localhost:27017/sologalaxy')
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
const User = mongoose.model('User',userSchema);

    

app.get('/',(req,res)=>{
    res.send('Hello World! and Sologalaxy')
})

app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword=await bcrypt.hash(password,10);

       
        const newUser=await User.create({name,email,password:hashedPassword});
        let token = jwt.sign({email},SECRET);
        res.cookie('tokens',token);
        console.log('cookiess',token);
        await newUser.save();
        res.status(201).json({message:'User registered successfully'});

    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
    })


app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'});
        }
        let token = jwt.sign({email},SECRET);
        res.cookie('tokens',token);
        console.log('cookiess',token);
        res.json({message:'Logged in successfully'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
})    










app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})