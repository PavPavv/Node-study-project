import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import sequelise from './db/db'
import usersRouter from './routes/users';
import groupsRouter from './routes/groups';
import { logger } from './logger/logger';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

//  parse body requests to JSON
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//  db initialization
sequelise
  .authenticate()
  .then(():void => console.log('Connection to db succeeded'))
  .catch((err: any) => console.error('Db connection error: ', err));

app.use('/', usersRouter);
app.use('/groups', groupsRouter)

//  Error-handling middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
   
  //  TODO: find how to handle it propely!
  // if (!login || !password || !age) {
  //   return res.status(400).json({
  //     message: 'uncorrect request data: login, password and age fields are required!',
  //   });
  // }
});

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
