import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  jobTitle: { type: String, required: true },
  salary: { type: String, required: true },
  password: { type: String, required: true },
  profilePicUrl: { type: String, required: false },
});

export default mongoose.model("User", UserSchema);
