require('dotenv').config()
const express=require('express')
const cors=require('cors')
const connectToDb=require('./db/db')
const userRoutes=require('./routes/user.routes')
const captainRoutes=require('./routes/captain.routes')
const cookieParser=require('cookie-parser')
const mapsRoutes=require('./routes/maps.routes')
const rideRoutes=require('./routes/ride.routes')
const paymentRoutes = require("./routes/paymentRoutes");

connectToDb()

const app=express()
app.use(cors({
    // origin: ['https://uber-riding-seven.vercel.app','http://localhost:5173' ],// Replace with your frontend's origin
    origin:"https://uber-riding-seven.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If you're sending cookies or auth headers
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.get('/',(req,res)=>{
    res.send('Hello World')
});

app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes);
app.use("/api/payment", paymentRoutes);

module.exports=app;