import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import userRouter from './routes/users';

dotenv.config();
const port = process.env.PORT || 3000;

const app: Express = express();
app.use(express.json());
//routes
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log('SERVER UP 🚀');
});
