import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuid, validate } from 'uuid';

import * as UsersDataAccess from '../data-access/data-access';
import { Users } from '../models/users';


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

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users  = await UsersDataAccess.getActualUsers();
    res.json(users);
  } catch (err: any) {
    return res.status(500).json({message: err.message});
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const user  = await UsersDataAccess.getActualUserById(id);
    res.json(user);
  } catch (err: any) {
      return res.status(500).json({message: err.message});
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const age = req.body.age;
    const maxId = await UsersDataAccess.getMaxUsersId();
    let id = 0;
    let strId = '';
    if (maxId) {
      id = (+maxId + 1);
      strId = id.toString();
    }

    const newUser = {
      id: strId,
      login,
      password,
      age: +age,
      isdeleted: false,
    };
    const createdUser = await UsersDataAccess.createUser(newUser);
    if (createdUser) {
      res.status(201).json(createdUser);
    }
    
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const newLogin = req.body.login;
    const newPassword = req.body.password;
    const newAge = req.body.age;

    const updatedUser = await UsersDataAccess.updateUser(id, newLogin, newPassword, newAge);
    if (updatedUser) {
      res.status(201).json({
        message: 'Successfully updated!'
      });
    }
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();

    const deletedUser = await UsersDataAccess.deleteUser(id);
    if (deletedUser) {
      res.status(201).json({
        message: 'Successfully deleted!'
      });
    }
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const autoSuggest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, loginSubstring } = req.query;
    const usersSuggest = await getAutoSuggestUsers(loginSubstring as string, Number(limit));
    res.status(201).json(usersSuggest);
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
};