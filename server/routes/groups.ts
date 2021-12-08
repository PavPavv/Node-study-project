import express from 'express';
import Joi from 'joi';

import { getGroups,
         getGroupById,
         createNewGroup,
         updateGroupById,
         deleteGroupById
        } from '../controllers/groups';

const groupsRouter = express.Router();
//const validator = require('express-joi-validation').createValidator({});

//  server validation schemas for users routes

// const postSchema = Joi.object({
//   login: Joi.string().required(),
//   password: Joi.string().regex(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/).required(),
//   age: Joi.string().regex(/^\b([4-9]|[1-9][0-9]|1[01][0-9]|1[1-2][0-9]|130)\b$/).required(),
// });

// const updateSchema = Joi.object({
//   login: Joi.string(),
//   password: Joi.string().regex(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/),
//   age: Joi.string().regex(/^\b([4-9]|[1-9][0-9]|1[01][0-9]|1[1-2][0-9]|130)\b$/),
// });

// const paramSchema = Joi.object({
//   id: Joi.number().required(),
// });

//  GROUPS ROUTES

//  GET /groups
groupsRouter.get('/', getGroups);

//  GET /groups/group
groupsRouter.get('/group', getGroupById);

//  POST /groups
groupsRouter.post('/', createNewGroup);

//  PUT /groups
groupsRouter.put('/', updateGroupById);

//  DELETE /groups
groupsRouter.delete('/', deleteGroupById);

export default groupsRouter;