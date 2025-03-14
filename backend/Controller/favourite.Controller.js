import Favourite from '../models/Favourite.js'

export const createfavourite = async(req,res,next)=>{
    console.log("creating favourite section");
    try {
        const favourite = await Favourite.create(req.body)
        return res.status(201).json({message:"Favourite created",favourite});
        
    } catch (error) {
        next(error)
    }
    }


