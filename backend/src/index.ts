import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import rooRouter from './routes/index';
const app = express();

app.use(express.json());
app.use('api/v1', rooRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})