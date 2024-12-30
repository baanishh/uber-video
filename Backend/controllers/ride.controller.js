const rideService=require('../services/ride.service')
const {validationResult} = require('express-validator')
const mapService=require('../services/maps.service');
const {sendMessageToSocketId }=require('../socket');
const rideModel = require('../models/ride.model');


// create ride
module.exports.createRide=async(req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { pickup, destination, vehicleType}=req.body
        try {
        const ride = await rideService.createRide({user:req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride);
        // console.log("ride",ride);
        

        //getting pickup coordinates
        const pickupCoordinates=await mapService.getAddressesCoordinate(pickup) //here we get pickup coordinates of user
        // console.log("pickup",pickupCoordinates); 
        
        //find nearby captain
        const captainInRadius=await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2)// here we passing coord to find nearby captains
        console.log("avCap",captainInRadius);
         
        //sending ride details to client side of captain
        ride.otp=""
        //getting user details who need ride
        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate("user")
        
        captainInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:"new-ride",
                data:rideWithUser
            })
        })

    } catch (error) {
        res.status(500).json(
            console.log(error)
        );
    }
}


//get calculating fare
module.exports.getFare=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {pickup, destination}=req.query
    try {
        const fare=await rideService.getFare(pickup, destination)
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({message:error.msg})
    }
}

//confirm ride
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

//start ride
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

//end ride
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}