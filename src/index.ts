import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import './database';
import { authRoutes } from './routes/authRoutes';

import { PORT } from './config';

require('dotenv').config();

require('./lib/passport');

const app = express();

const start = async () => {
  app.use(cors());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(passport.initialize());

  app.use('/users', authRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
