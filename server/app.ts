import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import sequelise from './db/db'
import usersRouter from './routes/users';
import groupsRouter from './routes/groups';
import authRouter from './routes/auth';
import { logger } from './logger/logger';
import { loggerMiddleware } from './middleware/logger';
import { errorHandlerMiddleware } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

//  MIDDLEWARES
//  parse body requests to JSON
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(loggerMiddleware);
//  app.use(authMiddleware);
app.use(errorHandlerMiddleware);


//  db initialization
sequelise
  .authenticate()
  .then(():void => console.log('Connection to db succeeded'))
  .catch((err: any) => console.error('Db connection error: ', err));

app.use('/auth', authRouter)  
app.use('/', usersRouter);
app.use('/groups', groupsRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  sequelise.close();
});

process.on('uncaughtException', (error) => {
  logger.error(error);
  sequelise.close();
  process.exit(2);
});

process.on('unhandledRejection', (error) => {
  logger.error(error);
  sequelise.close();
  process.exit(3);
});
