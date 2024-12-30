const { query } = require('express');
const mapService=require('../services/maps.service')
const {validationResult} = require('express-validator');

// get location lng and ltd
module.exports.getCoordinates=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const {address}=req.query

    try {
        const coordinates=await mapService.getAddressesCoordinate(address);
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({message:"Coordinate not found"})
    }
}

//get distance and time to location
module.exports.getDistanceTime=async(req,res)=>{
    try {
        const error=validationResult(req);
         if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const {origin , destination}=req.query

    const distanceTime= await mapService.getDistanceTime(origin,destination)
    res.status(200).json(distanceTime)    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

//get suggestions
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}