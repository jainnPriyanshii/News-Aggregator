import { configDotenv } from "dotenv";
import { errorHandler } from "./error.js";
// import jwt from "jwtwebtokens";
import jwt from 'jsonwebtoken';


export const verifyToken = (req,res,next)=>{
    console.log("Verifying user details: ",req.params.id)
    const token = req.cookies.access_token;

    if(!token){
        console.log("Token not found");
        return next(errorHandler(401,"You are not verified"));
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Token not valid!"))
        console.log("user verified",user);
        req.user = user;
        console.log("redirecting to controller")
        next();
    })
}