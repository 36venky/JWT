import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin','user'], default: 'user' },
  date:     { type: Date, default: Date.now() }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
