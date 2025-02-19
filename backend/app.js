import express from 'express';
import authRoutes from './src/routes/auth.route.js';
import {connectDB} from './src/lib/db.js';    
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from 'cookie-parser';



const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
}));
app.use("/api",authRoutes);




app.get('/',(req,res)=>{
    res.send("scd"); 
})



app.listen(3000,()=>{
    console.log("server is running on port 3000");
    connectDB();
});