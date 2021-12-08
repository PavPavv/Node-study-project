import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Group } from '../types/group';
import * as GroupsDataAccess from '../data-access/groups'

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups  = await GroupsDataAccess.getAllGroups();
    if (groups) {
      res.json(groups);
    } else {
      res.json({
        message: 'No groups found'
      });
    }
  } catch (err: any) {
    return res.status(500).json({message: err.message});
  }  
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const group  = await GroupsDataAccess.getGroupById(id);
    if (group) {
      res.json(group);
    } else {
      res.json({
        message: 'Something went wrong with users_group transaction'
      });
    }
  } catch (err: any) {
    return res.status(500).json({message: err.message});
  }  
};

export const createNewGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body.name;

    const newGroup: Group = {
      id: uuidv4(),
      name,
      permission: ['READ'],
    };

    const createdGroup = await GroupsDataAccess.createGroup(newGroup);
    if (createdGroup) {
      res.status(201).json({
        message: `The group ${name} has been successfully created.`
      });
    }
    
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const updateGroupById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const updatedGroup = await GroupsDataAccess.updateGroupById(id, name);
    if (updatedGroup) {
      res.status(201).json({
        message: 'The group has been successfully updated!'
      });
    }
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
}

export const deleteGroupById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const deletedGroup = await GroupsDataAccess.deleteGroupById(id);
    if (deletedGroup) {
      res.status(201).json({
        message: 'The group has been successfully deleted!'
      });
    }
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
}