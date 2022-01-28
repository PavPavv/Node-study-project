import { Request, Response, NextFunction } from 'express';

import * as groupsServices from '../services/groups';
import { StatusCodesEnum } from '../constants/statuseCodes';

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
  const groups = await groupsServices.getGroupsService();
  if (groups) {
    res.status(StatusCodesEnum.OK).json(groups);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error with getting the groups`,
      }
    );
  }

  return next(); 
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  const group = await groupsServices.getGroupByIdService(id);
  if (group) {
    res.status(StatusCodesEnum.OK).json(group);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error with getting the group`,
      }
    );
  }

  return next();
};

export const createNewGroup = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;
  const group = await groupsServices.createNewGroupService(name);

  if (group) {
    res.status(StatusCodesEnum.SuccessfullyCreated).json(group);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error occurred while creating a new group`,
      }
    );
  }

  return next();
};

export const updateGroupById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  const name = req.body.name;
  const group = await groupsServices.updateGroupByIdService(id, name);
  
  if (group) {
    res.status(StatusCodesEnum.OK).json({
      message: 'The group has been successfully updated',
    });
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error occurred while creating a new group`,
      }
    );
  }

  return next();
};

export const deleteGroupById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  const deletedGroup = await groupsServices.deleteGroupByIdService(id);

  if (deletedGroup) {
    res.status(StatusCodesEnum.OK).json({
      message: 'The group has been successfully deleted',
    });
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error occurred while deleting a new group`,
      }
    );
  }

  return next();
};