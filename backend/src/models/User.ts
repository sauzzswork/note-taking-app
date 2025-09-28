import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  otp: { type: String },
  otpExpires: { type: Date },
  googleId: { type: String },
});

export default model('User', UserSchema);