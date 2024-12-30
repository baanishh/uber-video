const userModel=require('../models/user.model')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackList.model");
const captainModel = require("../models/captain.model");

//user-middlewares
module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization 
  const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);
  console.log("headerss",token);
  
  
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded',decoded._id);
    
    const user = await userModel.findById(decoded._id);
    console.log("userrrr",user);
    
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ message: "unauthorized token" });
  }
};

//captain-middlewares
module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;  
    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized token" });
  }
};
