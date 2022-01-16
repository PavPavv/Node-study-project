import express from 'express';
import Joi from 'joi';

import { 
  getUsers,
  getDeletedUsers,
  getUserById, 
  createUser, 
  deleteUserById, 
  updateUserById, 
  autoSuggest,
  addToGroup
} from '../controllers/users';

const usersRouter = express.Router();
const validator = require('express-joi-validation').createValidator({});

//  server validation schemas for users routes

const postSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().regex(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/).required(),
  age: Joi.string().regex(/^\b([4-9]|[1-9][0-9]|1[01][0-9]|1[1-2][0-9]|130)\b$/).required(),
});

const updateSchema = Joi.object({
  login: Joi.string(),
  password: Joi.string().regex(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
  age: Joi.string().regex(/^\b([4-9]|[1-9][0-9]|1[01][0-9]|1[1-2][0-9]|130)\b$/),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

//  USERS ROUTES

//  GET /users
usersRouter.get('/users', getUsers);

//  GET /all-users (with soft-deleted)
usersRouter.get('/deleted-users', getDeletedUsers);

//  GET /users/{string}
usersRouter.get('/users/:id', validator.params(paramSchema), getUserById);

//  POST /users
usersRouter.post('/users', validator.body(postSchema), createUser);

//  PUT /users/{string}
usersRouter.put('/users/:id', validator.params(paramSchema), validator.body(updateSchema),updateUserById);

//  DELETE /users/{string}
usersRouter.delete('/users/:id', validator.params(paramSchema), deleteUserById);

//  GET /suggest/users?limit={number}&loginSubstring={string}
usersRouter.get('/suggest/users', autoSuggest);

//  POST /users/addToGroup
usersRouter.post('/users/addToGroup', addToGroup);

export default usersRouter;