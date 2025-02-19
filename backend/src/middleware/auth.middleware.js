import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req,res,next)=>{
    console.log("protect route");
    try{
        console.log(req.cookies);
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized Access"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized Access"});
        }
        const user = await User.findOne({ _id: decoded.userId });
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        delete user.password;
        req.user = user;
        next();

    }catch(error){
        console.log("Error in protect route middleware", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}






