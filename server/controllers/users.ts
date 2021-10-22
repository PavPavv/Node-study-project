import express, { Request, Response, NextFunction } from 'express';

import { User } from "../db/data";
import { users } from "../db/data";

//  db async queries imitating
// const fakeUsersFetch = (): Promise<User[]> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(users);
//     }, 500);
//   });
// };

//  Helper function which is returning array of logins matched to the users input value
const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  const arr = users.map((user: User) => user.login)
                           .sort()
                           .filter((login: string) => login.toLowerCase().includes(loginSubstring));                      
  
  return arr.slice(0, limit);
};

//  Control functions for a certain routes

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const actualUsers = users.filter((user: User) => user.isDeleted !== true);
  res.json(actualUsers);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const userById = users.filter((user: User) => user.id === id);

  if (userById.length === 1) {
    res.json(userById);
  } else {
    res.status(404).send({
      message: `Error: there is no user with id: ${id}`,
    });
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
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
  };

  if (!login || !password || !age) {
    return res.status(400).json({
      message: 'uncorrect request data: login, password and age fields are required!',
    });
  }

  //  create post in db
  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully!',
  });
};

export const deleteUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const userById = users.filter((user: User) => user.id === id);

  if (userById.length === 1) {
    //  mark object as deleted and hide it from view collecton
    userById[0].isDeleted = true;
    
    res.status(201).json({
      message: `User with login '${userById[0].login}' been successfully deleted!`,
    });
  } else {
    res.status(404).send({
      message: `Error: there is no user with id: '${userById[0].id}'`,
    });
  }
};

export const updateUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.toString();
  const newLogin = req.body.login;
  const newPassword = req.body.password;
  const newAge = req.body.age;
  const userById = users.filter((user: User) => user.id === id);

  if (userById.length === 1) {
    userById[0].login = newLogin ? newLogin : userById[0].login;
    userById[0].password = newPassword ? newPassword : userById[0].password;
    userById[0].age = newAge ? newAge : userById[0].age;

    res.status(201).json({
      message: `User with id ${id} been successfully updated!`,
    });
  } else {
    res.status(404).send({
      message: `Error: there is no user with id: ${id}`,
    });
  }
};

export const autoSuggest = (req: Request, res: Response, next: NextFunction) => {
  const value = req.body.value.toLowerCase();
  const answer = getAutoSuggestUsers(value, 10);

  res.status(201).json(answer);
};