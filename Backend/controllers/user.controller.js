const userModel=require('../models/user.model')
const {validationResult}=require('express-validator')
const userService= require('../services/user.services')
const blackListTokenModel=require('../models/blackList.model')

//register-user
module.exports.registerUser=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    const {fullname, email, password}=req.body

    const isUserAlreadyExist=await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(400).json({message:"User already exists"})
    }

    const hashedPassword=await userModel.hashPassword(password)

    const user= await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    })

    const token= user.generateAuthToken();

    res.status(201).json({token, user})
}

//login-user
module.exports.loginUser=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email, password}=req.body

    const user =await userModel.findOne({email}).select('+password')
    if(!user){
        return res.status(401).json({message:"Invalid Email or Password"})
    }

    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"})
    }

    const token=user.generateAuthToken()

    res.cookie('token',token)
    res.status(200).json({token,user})
}

//profile-user
module.exports.getUserProfile=async(req,res)=>{
    res.status(200).json(req.user);
}

//logout-user
module.exports.logoutUser=async(req,res)=>{
    res.clearCookie('token')
    const token=req.cookies.token || req.headers.authorization.split(' ')[1]

    await blackListTokenModel.create({token})

    res.status(200).json({message:"Logged Out"})
}