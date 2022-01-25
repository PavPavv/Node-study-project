import { Request, Response, NextFunction } from 'express';

import * as usersServices from '../services/users';
import { StatusCodesEnum } from '../constants/statuseCodes';

//  Control functions for a certain routes

export const getDeletedUsers = async (req: Request, res: Response, next: NextFunction) => {
  const softDeletedUsers = await usersServices.getSoftlyDeletedUsersService();
  if (softDeletedUsers) {
    res.status(StatusCodesEnum.OK).json(softDeletedUsers);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error occurred while getting softly deleting users`,
      }
    );
  }

  return next();
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await usersServices.getUsersService();
  if (users) {
    res.status(StatusCodesEnum.OK).json(users);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `Error occurred while getting users`,
      }
    );
  }

  return next();
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const user  = await usersServices.findUserService(id);

  if (user) {
    res.status(StatusCodesEnum.OK).json(user);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `User with id "${id}" not found.`
      }
    );
  }

  return next();
};

export const getUserByLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.body;
  const user  = await usersServices.findUserService('', login);

  if (user) {
    res.status(StatusCodesEnum.OK).json(user);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json(
      {
        message: `User with id "${login}" not found.`
      }
    );
  }

  return next();
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password, age } = req.body;
    const newUser = await usersServices.createUserService({login, password, age});
  
    if (newUser) {
      res.status(StatusCodesEnum.SuccessfullyCreated).json({
        message: `User successfully created`,
      });
    } else {
      return res.status(StatusCodesEnum.InternalServerError).json({
        message: `User with such login already exists.`
      });
    }
  
    return next();
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const login = req.body.login;
  const password = req.body.password;
  const age = req.body.age;
  const updatedUser = await usersServices.updateUserService({ id, login, password, age });

  if (updatedUser) {
    res.status(StatusCodesEnum.OK).json({
      message: 'Successfully updated!'
    });
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json({
      message: `User error occurred.`
    });
  }

  return next();
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const deletedUser = await usersServices.deleteUserService(id);
  
  if (deletedUser) {
    res.status(StatusCodesEnum.OK).json({
      message: 'Successfully deleted!'
    });
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json({
      message: `Deletion error occurred.`
    });
  }

  return next();
};

export const autoSuggest = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, loginSubstring } = req.query;
  const usersSuggest = await usersServices.autoSuggestUsersService(loginSubstring as string, Number(limit));
    
  if (usersSuggest) {
    res.status(StatusCodesEnum.OK).json(usersSuggest);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json({
      message: `Filtering error occurred.`
    });
  }

  return next();
};

export const addToGroup = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = req.body.groupId;
  const userId = req.body.userId;
  const addedUsersToGroup = await usersServices.addToGroupService(groupId, userId);
    
  if (addedUsersToGroup) {
    res.status(StatusCodesEnum.OK).json(addedUsersToGroup);
  } else {
    return res.status(StatusCodesEnum.InternalServerError).json({
      message: `Error occurred while adding user to group.`,
    });
  }

  return next();
}