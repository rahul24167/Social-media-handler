import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import rooRouter from './routes/index';
import { connectToDatabase } from './db';
const app = express();

app.use(express.json());
app.use('api/v1', rooRouter);


connectToDatabase().then(() => {
    app.listen(3000, () => console.log(`Server running on port 3000`));
  });
