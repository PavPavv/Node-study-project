import sequelise from '../db/db';
import { User, op } from "../models/users";
import { Group } from '../models/groups';
import { UserGroup } from '../models/userGroup';
import { User as UserType} from "../types/users";

export const getActualUsers = async () => {
  try {
    const actualUsers = await User.findAll({
      where: {
        isdeleted: false,
      }
    });
    return actualUsers;
  } catch (err: any) {
    console.log('db error: ', err);[]
  }
};

export const getDeletedUsers = async () => {
  try {
    const allUsers = await User.findAll({
      where: {
        isdeleted: true,
      }
    });
    return allUsers;
  } catch (err) {
    console.log(err);
  }
};

export const getArrayOfLogins = async (str: string, limit: number) => {
  try {
    const logins = await User.findAll({
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
    const actualUser = await User.findOne({
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

export const getActualUserByLogin = async (login: string) => {
  try {
    const actualUser = await User.findOne({
      where: {
        [op.and]: [
          {
            isdeleted: false,
          },
          {
            login,
          },
        ],
      }
    });
    return actualUser;
  } catch (err: any) {
    console.log('db error: ', err);
  }
};

export const createUser =  async (user: UserType) => {
  try {
    const foundUser = await User.findOne({
      where: {
        id: user.id,
      },
    });
    if (!foundUser) {
      const newUser = await User.create(user);
      return { newUser, created: true };
    }
  } catch (err) {
    console.log('db error: ', err);
  }
};

export const updateUser =  async (id: string, login: string, password: string, age: string) => {
  try {
    const foundUser = await User.findOne({
      where: {
        id,
      },
    });
    if (foundUser) {
      const updatedUser = await User.update(
        {
          login,
          password,
          age,
        },
        {
          where: {
            id,
          },
        },
      );
    }
    return foundUser;
  } catch (err) {
    console.log('db error: ', err);
  }
};

export const deleteUser =  async (id: string) => {
  try {
    const foundUser = await User.findOne({
      where: {
        id,
      },
    });
    if (foundUser) {
      const updatedUser = await User.update(
        {
          'isdeleted': true,
        },
        {
          where: {
            id,
          },
        },
      );
    }
    return foundUser;
  } catch (err) {
    console.log('db error: ', err);
  }
};

export const addUsersToGroup = async (groupId: string, userId: string) => {
  const t = await sequelise.transaction();

  try {
    const targetGroup = await Group.findOne({
      where: {
        id: groupId,
      },
    });
    const targetUser = await User.findOne({
      where: {
        id: userId,
      }
    })
    
    if (targetGroup && targetUser) {
      const userInGroup = await UserGroup.create({
        userId,
        groupId,
      }, { transaction: t });

      await t.commit();

      return {
        status: 1,
      }
    } else {
      return {
        status: 0,
      }
    }

  } catch (err: any) {
    await t.rollback();
    throw err;
  }
};