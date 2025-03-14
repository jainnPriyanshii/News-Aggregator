import mongoose from 'mongoose'

const favouriteSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },

    // id:{
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
     
    description:{
        type : String,
        required:true,
    },

    // tag:{
    //     type : String,
    //     required:true,
    // },

    // Newstype:{
    //     type : String,
    //     required:true,
    // }

})

const Favourite = mongoose.model('Favourite',favouriteSchema);

export default Favourite;