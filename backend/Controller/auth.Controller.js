import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import 'dotenv'



export const signUp = async(req,res,next) =>{

    console.log(req.body);
    const {username ,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10)
    const user = new User({username,email,password:hashedPassword});
    try {
        await user.save()
        res.status(201).json({ message: "User registered successfully"});
    } catch (error) {
        next(error)
    }

}

export const signIn = async (req, res,next) => {
    console.log(`Trying to signin with following details: $(req.body)`)
    const {email,password } = req.body;

    if(email&& password){
        console.log(email,password)
    }

    try {
        const validUser = await User.findOne({email})

        if(!validUser){
           next(errorHandler(404,"Not registered"))
        } 
        const validpassword = bcrypt.compareSync(password,validUser.password)
        if(!validpassword){
           next(errorHandler(401,"invalid password"))
        }
        console.log("User signined sucessfully")
         const token = jwt.sign({id:validUser.id},process.env.JWT_SECRET)
         console.log(token)
         const { password: pass, ...rest } = validUser._doc;
         res.cookie("accesstoken",token,{httpOnly:true}).status(200).json({message:"User signed in"})
       
    } catch (error) {
        console.error("Registration error:", error);
        next(errorHandler)
    }
};


export const signOut = async (req,res,next) => {
    try {
        res.clearCookie("access_token")
        res.status(200).json({ message: "User logged out successfully"});
    } catch (error) {
        next(error)
    }
}