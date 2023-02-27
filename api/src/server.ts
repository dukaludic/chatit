import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import { getRoomUsers, userJoin, userLeave } from './helpers';
import * as Redis from 'redis';

import { Sequelize, Model, DataTypes } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD)

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    }
});

sequelize.sync()
    .then(() => {
        console.log('User table created!');
    });

const PORT = 8080;

const app = express();

const httpServer = http.createServer(app);



const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    }
})


io.on('connection', async (socket: Socket) => {
    console.log(`${socket.id} connected`);


    socket.on('join', async ({ username, room }: { username: string, room: string }) => {
        userJoin(socket.id, username, room);
        console.log(`${username} ${socket.id} has joined ${room}`);

        socket.join(room);

        socket.broadcast.to(room).emit('botMessage', `${username} has joined ${room}`)

        const roomUsers = await getRoomUsers(room);

        io.to(room).emit('roomUsers', roomUsers);
    })



    socket.on('chatMessage', ({ username, room, message }: { username: string, room: string, message: string }) => {
        io.to(room).emit('message', { username, message })
    })

    socket.on('disconnect', async () => {
        console.log(`${socket.id} disconnected`);
        const user = userLeave(socket.id);

        if (!user) {

            return;
        }

        socket.broadcast.to(user.room).emit('botMessage', `${user.username} has left ${user.room}`)

        const roomUsers = await getRoomUsers(user.room);

        io.to(user?.room).emit('roomUsers', roomUsers);
    })
})


httpServer.listen(PORT);