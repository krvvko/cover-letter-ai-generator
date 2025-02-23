import express from 'express';
import dotenv from 'dotenv';
import generateRouter from './routes/generate';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.use('/generate', generateRouter);

export default app;