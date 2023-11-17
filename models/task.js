import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    isCompleted:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Task = new mongoose.model("Task", schema);