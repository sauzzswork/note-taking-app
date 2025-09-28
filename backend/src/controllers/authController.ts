import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
};

export const startSignup = async (req: Request, res: Response) => {
  // 1. Get dateOfBirth from the request body
  const { email, fullName, dateOfBirth } = req.body;

  // 2. Add validation for the new field
  if (!email || !fullName || !dateOfBirth) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(otp, salt);

  // 3. Save the new dateOfBirth field to the database
  await User.findOneAndUpdate(
    { email },
    {
      name: fullName,
      email,
      dateOfBirth,
      otp: hashedOtp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    },
    { new: true, upsert: true }
  );

  console.log(`OTP for ${email} is: ${otp}`);

  res.status(200).json({ message: 'OTP sent successfully.' });
};

export const verifyOtpAndSignup = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.otp || !user.otpExpires || new Date() > user.otpExpires) {
    return res.status(400).json({ message: 'OTP is invalid or has expired' });
  }

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  });
};