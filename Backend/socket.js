const socketIO = require('socket.io');
const userModel=require('./models/user.model')
const captainModel=require('./models/captain.model')

let io;

// Initialize socket
const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin:"http://localhost:5173",// Your frontend URL
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    //handle connection
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        //to get unique socket id of user and captain when both are in their HOME PAGE
        socket.on('join',async(data)=>{
            const {userId, userType}=data;
            console.log('User joined:', { userId, userType });

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        })

        //to get captain current live location when in HOME PAGE
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
                // console.log('Location update from captain:', { userId, location });
                
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

// Send message to specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};
