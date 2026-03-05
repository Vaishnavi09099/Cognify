
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js';
import express from 'express';

import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js'
import flashcardRoutes from './routes/flashcardRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import progressRoutes from './routes/progressRoutes.js'




dotenv.config()


const app = express();

connectDB();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoutes)
app.use('/api/documents',documentRoutes);
app.use('/api/flashcards',flashcardRoutes);
app.use('/api/ai',aiRoutes);
app.use('/api/quizzes',quizRoutes);
app.use('/api/progress',progressRoutes);

app.get("/",(req,res)=>{
    res.send("Server running")
});

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})

