import mongoose from 'mongoose';


const SavedPostSchema = new mongoose.Schema({
  
  content: {
    type: String,
    required: true,
  },
  
  timestamp:{
    type: Date,
    required: true, 
    default: Date.now, 
  },
 
});


const SavedPost = mongoose.models.SavedPost || mongoose.model('SavedPost', SavedPostSchema);

export default SavedPost;
