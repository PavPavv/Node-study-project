import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import * as UsersDataAccess from '../data-access/users';
// import { Users } from '../models/users';


//  Helper function which is returning array of logins matched to the users input value from db
const getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
  try {
    const actlUsers = await UsersDataAccess.getArrayOfLogins(loginSubstring, limit);
    if (actlUsers) {
      return actlUsers;
    }
    return new Error('Something went wrong with filtering')
  } catch (err: any) {
    return err;
  }
};

//  Control functions for a certain routes

export const getDeletedUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users  = await UsersDataAccess.getDeletedUsers();
    res.json(users);
  } catch (err: any) {
    return res.status(500).json(
      {
        'function name': 'getDeletedUsers',
        'function args': 'none',
        message: err.message
      }
    );
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users  = await UsersDataAccess.getActualUsers();
    res.json(users);
  } catch (err: any) {
    return res.status(500).json(
      {
        'function name': 'getUsers',
        'function args': 'none',
        message: err.message
      }
    );
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();

  try {  
    const user  = await UsersDataAccess.getActualUserById(id);
    res.json(user);
  } catch (err: any) {
      return res.status(500).json(
        {
          'function name': 'getUserById',
          'function args': {
            id,
          },
          message: err.message
        }
      );
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login;
    const password = req.body.password;
    const age = req.body.age;
  
  try {
    const newUser = {
      id: uuidv4(),
      login,
      password,
      age: +age,
      isdeleted: false,
    };
    const createdUser = await UsersDataAccess.createUser(newUser);
    if (createdUser) {
      res.status(201).json({
        message: `User ${login} has been successfully created`,
      });
    }
    
  } catch (err: any) {
      return res.status(500).json(
        {
          'function name': 'createUser',
          'function args': {
            login,
            password,
            age,
          },
          message: err.message
        }
      )
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const newLogin = req.body.login;
  const newPassword = req.body.password;
  const newAge = req.body.age;

  try {
    const updatedUser = await UsersDataAccess.updateUser(id, newLogin, newPassword, newAge);
    if (updatedUser) {
      res.status(201).json({
        message: 'Successfully updated!'
      });
    }
  } catch (err: any) {
      return res.status(500).json(
        {
          'function name': 'updateUserById',
          'function args': {
            id,
            newLogin,
            newPassword,
            newAge,
          },
          message: err.message
        }
      )
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  
  try {
    const deletedUser = await UsersDataAccess.deleteUser(id);
    if (deletedUser) {
      res.status(201).json({
        message: 'Successfully deleted!'
      });
    }
  } catch (err: any) {
      return res.status(500).json(
        {
          'function name': 'deleteUserById',
          'function args': {
            id,
          },
          message: err.message
        }
      )
  }
};

export const autoSuggest = async (req: Request, res: Response, next: NextFunction) => {
  const { limit, loginSubstring } = req.query;

  try {  
    const usersSuggest = await getAutoSuggestUsers(loginSubstring as string, Number(limit));
    res.status(201).json(usersSuggest);
  } catch (err: any) {
    return res.status(500).json(
      {
        'function name': 'autoSuggest',
        'function args': {
          limit,
          loginSubstring,
        },
        message: err.message
      }
    )
  }
};

export const addToGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    
    console.log('userId',userId)
    console.log('groupId',groupId)

    const addedUsersToGroup = await UsersDataAccess.addUsersToGroup(groupId, userId);
    if (addedUsersToGroup.status) {
      res.status(201).json({
        message: 'Successfully added to group!'
      });
    } else {
      res.status(400).json({
        message: 'There is no such user or group :(',
      });
    }
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
}