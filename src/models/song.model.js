import mongoose from "mongoose";

const songSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lyric:{
        type:String,
        required:true,
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model('Song',songSchema);