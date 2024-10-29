import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import deptRouter from './routes/department.js';
import connectToDatabase from './db/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/department', deptRouter); // Ensure this line is present

app.listen(process.env.PORT, () => {
    console.log(`Server runs on the port ${process.env.PORT}`);
});
