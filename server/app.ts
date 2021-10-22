import express from 'express';

import usersRouter from './routes/users';

const app = express();
const PORT = 8000;

//  parse body requests to JSON
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', usersRouter);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});