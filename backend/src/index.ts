import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport'; // Import passport
import './config/passport'; // Import the passport config we just created
import { startSignup, verifyOtpAndSignup } from './controllers/authController';
import { getNotes, createNote, deleteNote } from './controllers/noteControllers';
import { protect } from './middleware/authMiddleware';
import jwt from 'jsonwebtoken'; // Import JWT

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // Initialize passport

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- Auth Routes ---
app.post('/api/auth/signup', startSignup);
app.post('/api/auth/verify', verifyOtpAndSignup);

// --- Google Auth Routes ---
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req: any, res) => {
    // On successful authentication, create a JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    // Redirect user back to the frontend with the token
    const userJson = JSON.stringify({ name: req.user.name, email: req.user.email, token });
    res.redirect(`http://localhost:5173/auth/callback?user=${encodeURIComponent(userJson)}`);
  }
);

// --- Notes Routes ---
app.get('/api/notes', protect, getNotes);
app.post('/api/notes', protect, createNote);
app.delete('/api/notes/:id', protect, deleteNote);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));