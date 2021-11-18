import { Users, op } from "../models/users";

import { User } from "../interfaces/users";

export const getAllUsers = async () => {
  try {
    const allUsers = await Users.findAll();
    return allUsers;
  } catch (err) {
    console.log(err);
  }
};

export const getMaxUsersId = async () => {
  try {
    const allUsers = await Users.findAll();
    return allUsers.length;
  } catch (err) {
    console.log(err);
  }
};

export const getActualUsers = async () => {
  try {
    const actualUsers = await Users.findAll({
      where: {
        isdeleted: false,
      }
    });
    return actualUsers;
  } catch (err: any) {
    console.log('db error: ', err);[]
  }
};

export const getArrayOfLogins = async (str: string, limit: number) => {
  try {
    const logins = await Users.findAll({
      limit,
      where: {
        [op.and]: [
          {
            login: {
              [op.iLike]: `%${str}%`,
            },
          },
          {
            isdeleted: false,
          },
        ],
      },
      attributes: ['login'],
    });
    return logins.map((item) => item.getDataValue('login'));
  } catch (err: any) {
    console.log('db error: ', err);
  }
};

export const getActualUserById = async (id: string) => {
  try {
    const actualUser = await Users.findOne({
      where: {
        [op.and]: [
          {
            isdeleted: false,
          },
          {
            id,
          },
        ],
      }
    });
    return actualUser;
  } catch (err: any) {
    console.log('db error: ', err);
  }
};

export const createUser =  async (user: User) => {
  try {
    const foundUser = await Users.findOne({
      where: {
        id: user.id,
      },
    });
    if (!foundUser) {
      const newUser = await Users.create(user);
      return { newUser, created: true };
    }
  } catch (err) {
    console.log('db error: ', err);
  }
};

export const updateUser =  async (id: string, login: string, password: string, age: string) => {
  try {
    const foundUser = await Users.findOne({
      where: {
        id: id,
      },
    });
    if (foundUser) {
      const updatedUser = await Users.update(
        {
          login,
          password,
          age,
        },
        {
          where: {
            id,
          }
        }
      );
    }
    return foundUser;
  } catch (err) {
    console.log('db error: ', err);
  }
};

export const deleteUser =  async (id: string) => {
  try {
    const foundUser = await Users.findOne({
      where: {
        id,
      },
    });
    if (foundUser) {
      const deletedUser = await Users.destroy({
        where: {
          id,
        }
      });
      return foundUser;
    }
  } catch (err) {
    console.log('db error: ', err);
  }
};
