import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);

const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:5173';

const io = new Server(server, {cors: { origin: [allowedOrigins] }});

// online users map = { userId: socketId }
const userSocketMap =  {};

function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    // Add user to online users map
    if(userId) userSocketMap[userId] = socket.id;

    // io.emit() sends event to all connected clients - broadcast
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        // Remove user from online users map
        if(userId) delete userSocketMap[userId];

        // Broadcast updated online users list
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export {app, server, io, getReceiverSocketId};