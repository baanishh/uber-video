const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController=require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware');

// to get user [userId, pickup location, destination ] || create ride
router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

//get fare of ride
router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage("Invalid Pickup"),
    query('destination').isString().isLength({min:3}).withMessage("Invalid destination"),
    rideController.getFare
)

//confirm ride
router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.confirmRide
)

//start ride
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

//end ride
router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)


module.exports=router