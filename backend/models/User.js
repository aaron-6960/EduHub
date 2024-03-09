import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    unique:true
  },
  chatgrps: {
    type: [String],
    required: false,
  },
  name: String,
  college: String,
  semester: String
});

const User = mongoose.model("User",userSchema)
export default User