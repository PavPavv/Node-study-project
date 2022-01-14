import express from 'express';

import { getGroups,
         getGroupById,
         createNewGroup,
         updateGroupById,
         deleteGroupById
        } from '../controllers/groups';

const groupsRouter = express.Router();

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