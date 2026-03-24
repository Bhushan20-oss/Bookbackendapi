const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/register', async(req, res)=>{
    const {name, email,password}= req.body;

    try{

        //validation

        if(!name||!email||!password){
            return res.status(400).json({
                message:"Please Provide all feilds",
            });
        }

        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(400).json({
                message:"User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const user =await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            message:'User registerd Successfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    }
    catch(error){
        res.status(500).json({
            message:"Error registering user",
            error:error.message,
        });
    }
});

module.exports = router;