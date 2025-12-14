import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const conn = mongoose.connection;

conn.on('error', () => {
    console.log("Error connecting to database")
})

conn.on('connected', () => {
    console.log("Connected to database")
})