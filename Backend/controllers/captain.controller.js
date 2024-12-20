const captainModel = require('../models/captain.model');
const createService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blackList.model');

//register-captain
module.exports.registerCaptain = async (req, res) => {

    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const {fullname, email, password, vehicle}=req.body

    const isCaptainAlreadyExist=await captainModel.findOne({email})
    if(isCaptainAlreadyExist){
        return res.status(400).json({error:'Captain already exists'})
    }
    const hashPassword=await captainModel.hashPassword(password)    

    const captain=await createService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })

    const token=captain.generateAuthToken();    

    res.status(201).json({token,captain})
}

//login captain
module.exports.loginCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await captain.comparePassword(password);
    if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({ token, captain });
}

//profile-captain
module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain:req.captain });
}

//logout-captain
module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListTokenModel.create({ token: token });
    res.clearCookie('token');   
    res.status(200).json({ message: 'logout successfully' });
}
