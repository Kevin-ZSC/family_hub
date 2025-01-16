import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    }, 
    timestamp:{
        type: Date,
        required: true, 
        default: Date.now, 
    }
})
export default mongoose.models.Post || mongoose.model('Post',PostSchema)