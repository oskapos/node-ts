import express from 'express';
import cookieParser from 'cookie-parser';
import Routes from './routes/route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(Routes);

app.listen(5000, () => console.log('Server Running on 5000.'));
