import express, { Request, Response, NextFunction } from 'express';

import usersRouter from './routes/users';

const app = express();
const PORT = 8000;

//  parse body requests to JSON
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', usersRouter);

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