import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import rooRouter from './routes/index';
import { connectToDatabase } from './db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', rooRouter);

connectToDatabase().then(() => {
    app.listen(3000, () => console.log(`Server running on port 3000`));
  });
