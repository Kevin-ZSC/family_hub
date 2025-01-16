import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema ({

    author: {
        type:String,
        required:true
    },
    content:{
        type: String,
        required:true
    }, 
    timestamp:{
        type: Date,
        required: true, 
        default: Date.now, 
      },
})

export default mongoose.models.comment || mongoose.model('Comment', CommentSchema)