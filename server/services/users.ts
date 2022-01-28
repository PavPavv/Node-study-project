import { v4 as uuidv4 } from 'uuid';

import { User } from '../types/users';
import * as UsersDataAccess from '../data-access/users';

export const createUserService = async (obj: Pick<User, "login" | "password" | "age">) => {
  const { login, password, age } = obj;
  const newUser: User = {
    id: uuidv4(),
    login,
    password,
    age: +age,
    isdeleted: false,
  };
  const createdUser = await UsersDataAccess.createUser(newUser);
  return createdUser ? true : false;
};


export const findUserService = async (id: string = '', login: string = '') => {
  if (id) {
    const userWithId = await UsersDataAccess.getActualUserById(id);
    return userWithId ? userWithId : null;
  }

  if (login) {
    const userWithLogin = await UsersDataAccess.getActualUserByLogin(login);
    return userWithLogin ? userWithLogin : null;
  }
};

export const updateUserService = async (obj: Omit<User, "isdeleted">) => {
  const { id, login, password, age } = obj;
  const updatedUser = await UsersDataAccess.updateUser(id, login, password, age);

  if (updatedUser) {
    return updatedUser ? updatedUser : null;
  }
};

export const deleteUserService = async (id: string) => {
  const deletedUser = await UsersDataAccess.deleteUser(id);
  if (deletedUser) {
    return deletedUser ? deletedUser : null;
  }
};

export const getUsersService = async () => {
  const users  = await UsersDataAccess.getActualUsers();
  if (users) {
    return users ? users : null;
  }
};

export const getSoftlyDeletedUsersService = async () => {
  const deletedUsers  = await UsersDataAccess.getDeletedUsers();
  if (deletedUsers) {
    return deletedUsers ? deletedUsers : null;
  }
};

export const autoSuggestUsersService = async (loginSubstring: string, limit: number) => {
  try {
    const actualUsers = await UsersDataAccess.getArrayOfLogins(loginSubstring, limit);
    if (actualUsers) {
      return actualUsers;
    }
    return new Error('Something went wrong with filtering')
  } catch (err: any) {
    return err;
  }
};

export const addToGroupService = async (groupId: string, userId: string) => {
  const addedUsersToGroup = await UsersDataAccess.addUsersToGroup(groupId, userId);
  if (addedUsersToGroup) {
    return addedUsersToGroup ? addedUsersToGroup : null;
  }
};
