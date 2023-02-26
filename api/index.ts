import express from 'express';
import http from 'http';
import { Server } from "socket.io";


const PORT = 8080;

const app = express();

const httpServer = http.createServer(app);

app.get('/', (req, res) => {
    res.send('HELLO')
})

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    }
})


io.on('connection', (socket: any) => {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

io.on('disconnect', (socket) => {
    console.log(`${socket.id} disconnected`)
})

httpServer.listen(PORT);


// const httpServer = http.createServer();
// // const io = new Server(httpServer, {
// //     cors: {
// //         origin: ["http://localhost:3000"]
// //     }
// // });

// // app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hi');
// })

// io.on("connection", (socket: any) => {
//     console.log(socket.id); // Iv7-mJelg7on_ALbx
// });


// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })

/////////////////////////// dole radi

// const io = require('socket.io')(8080, {
//     cors: {
//         origin: ['http://localhost:3000']
//     }
// });

// io.on('connection', (socket: any) => {
//     console.log(socket.id);
// })

// console.log(`running on ${8080}`)