import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import 'dotenv'
import cookieParser from 'cookie-parser'


import favouriteRouter from './Routes/favourite.route.js'
import userRouter from './Routes/user.route.js'
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

mongoose.connect("mongodb+srv://priyanshijain664:jain2004@news.bm240.mongodb.net/?retryWrites=true&w=majority&appName=News")
    .then(() => {
        console.log("Connected to MongoDB!!");
        console.log("Starting the server now.")
        app.listen(3000, (err) => {
            if (err) throw err;
            console.log("The server is running on port 3000")
        })

        app.use('/backend/user', userRouter)
        app.use('/backend/favourite', favouriteRouter)
        

        app.use((err, req, res, next) => {
            console.log("In the error handler middleware in server.js file")
            const statusCode = err.statusCode || 500;
            const message = err.message || "Something went wrong";
            res.status(statusCode).json({
                success: false,
                message,
                statusCode
            });
        })
    })
    .catch((err) => { console.log("ERROR in MongoDB Connection", err) })
