import express from 'express';

import { loginData, signupData } from '../interfaces/interfaces';
import { Schemas, ValidateJoi } from '../middlewares/joi';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Express!' });
});

router.get('/protected', (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(403).json({ message: 'NOT ALLOWED' });
  }

  res.status(200).json({ message: 'ALLOWED =>' });
});

router.get('/notfound', (req, res, next) => {
  res.status(404).json({ message: 'Not Found!' });
});

router.post('/login', ValidateJoi(Schemas.login), (req, res, next) => {
  const data = req.body as loginData;

  res.status(200).json({ message: 'Logged in successfully.' });
});

router.post('/signup', ValidateJoi(Schemas.signup), (req, res, next) => {
  const data = req.body as signupData;

  res.status(201).json({ message: 'Signed up successfully.' });
});

export default router;
