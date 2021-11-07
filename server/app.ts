import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import sequelise from './db/db'
import usersRouter from './routes/users';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

//  parse body requests to JSON
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', usersRouter);

sequelise
  .authenticate()
  .then(():void => console.log('Connection to db succeeded'))
  .catch((err: any) => console.error('Db connection error: ', err));

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