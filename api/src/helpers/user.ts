import { User } from "../types";
import * as Redis from 'redis';


const users: User[] = [];

export const userJoin = async (socketId: string, username: string, room: string) => {
    const client = Redis.createClient();

    await client.connect();

    client.LPUSH(`room:${room}`, username);
};

export const getUserBySocketId = (socketId: string): User | undefined => {
    const user = users.find(u => u.socketId === socketId);
    return user;
}

export const getRoomUsers = async (room: string): Promise<string[]> => {
    const client = Redis.createClient();
    await client.connect();

    const roomUsers = await client.lRange(`room:${room}`, 0, -1);

    console.log(roomUsers, 'roomUsers')

    // const roomUsers = users.filter(u => u.room === room);
    return roomUsers;
}

export const userLeave = (socketId: string): User | undefined => {
    const index = users.findIndex(user => user.socketId === socketId);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};