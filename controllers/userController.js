const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

//Register

const registerUser = async(req, res)=>{
    const {name, email,password}= req.body;

        //validation
        if(!name||!email||!password){
            return res.status(400);
            throw new Error("All fields are required");
        }

        const userExists = await User.findOne({email});

        if(userExists){
            res.status(400);
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const user =await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            success:true,
            message:'User registerd Successfully',
            data:{
                _id:user._id,
                name:user.name,
                email:user.email,
                token: generateToken(user._id),
            },
        });
    };

    const loginUser =async(req, res)=>{
    const{email, password} =req.body;

        if(!email||!password){
            res.status(400);
            throw new Error("All feilds required");
        }

        //check user

        const user =await User.findOne({email});

        if(!user || !(await bcrypt.compare(password, user.password))){
            res.status(401);
            throw new Error("Invalid Credentials");
        }

        res.json({
            success:true,
            message:"Login Successful",
            data:{
                token:generateToken(user._id),
                user:{
                    _id:user._id,
                    email:user.email,
                },
            },
        });
}


module.exports = { registerUser, loginUser };