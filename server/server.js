import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
const app=express();


dotenv.config();

//middleware
import { notFoundMiddleware } from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";

import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRouter.js';

if(process.env.NODE_ENV!=="production"){
    app.use(morgan('dev'))
}

app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json("Jobify application");
});

app.get("/api/v1",(req,res)=>{
    res.status(200).json({msg:"version one"});
});

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port=process.env.PORT||5000



const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }

}  

start(); 