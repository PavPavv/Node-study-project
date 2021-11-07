import express, { Request, Response, NextFunction } from 'express';

import { User } from "../interfaces/users";
import { users } from "../db/data";

const actualUsers = async (): Promise<User[]> => users.filter((user: User) => user.isDeleted !== true);

//  Helper function which is returning array of logins matched to the users input value
const getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
  try {
    const actlUsers: User[] = await actualUsers();
    const arr = actlUsers.map((user: User) => user.login)
                             .sort()
                             .filter((login: string) => login.toLowerCase().includes(loginSubstring));                      
    
    return arr.slice(0, limit);
  } catch (err: any) {
    return err;
  }
};

//  Control functions for a certain routes

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const actlUsers: User[] = await actualUsers();
  res.json(actlUsers);
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const actlUsers: User[] = await actualUsers();
    const userById = actlUsers.filter((user: User) => user.id === id);

    if (userById.length === 1) {
      res.json(userById);
    } else {
      res.status(404).send({
        message: `Error: there is no user with id: ${id}`,
      });
    }
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const age = req.body.age;
    const biggestId = users.map(item => item.id).map(Number);
    const newId = Math.max(...biggestId) + 1;
    const newUser = {
      id: newId.toString(),
      login: login,
      password: password,
      age: +age,
      isDeleted: false,
    }
  
    //  create post in db
    users.push(newUser);
  
    res.status(201).json({
      message: 'User created successfully!',
    });
    
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id.toString();
    const actlUsers: User[] = await actualUsers();
    const userById = actlUsers.filter((user: User) => user.id === id);

    if (userById.length === 1) {
      //  mark object as deleted and hide it from view
      userById[0].isDeleted = true;
      
      res.status(201).json({
        message: `User with login '${userById[0].login}' has been successfully deleted!`,
      });
    } else {
      res.status(404).send({
        message: `Error: there is no user with id: '${userById[0].id}'`,
      });
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
    const actlUsers: User[] = await actualUsers();
    const userById = actlUsers.filter((user: User) => user.id === id);

    if (userById.length === 1) {
      userById[0].login = newLogin ? newLogin : userById[0].login;
      userById[0].password = newPassword ? newPassword : userById[0].password;
      userById[0].age = newAge ? newAge : userById[0].age;
  
      res.status(201).json({
        message: `User with id ${id} has been successfully updated!`,
      });
    } else {
      res.status(404).send({
        message: `Error: there is no user with id: ${id}`,
      });
    }
  } catch (err: any) {
      return res.status(500).json({message: err.message})
  }
};

export const autoSuggest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, loginSubstring } = req.query;
    const suggest = {
      usersSuggest: await getAutoSuggestUsers(loginSubstring as string, Number(limit)),
    };
    res.status(201).json(suggest);
  } catch (err: any) {
    return res.status(500).json({message: err.message})
  }
};