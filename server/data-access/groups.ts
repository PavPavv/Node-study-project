import sequelise from '../db/db';
import { Group } from "../models/groups";
import { User } from "../models/users";
import { UserGroup } from '../models/userGroup';
import { Group as GroupType} from "../types/group";

export const createGroup = async (group: GroupType) => {
  try {
    const newGroup = await Group.create(group);
    return newGroup;
  } catch (err: any) {
    console.log(err)
  }
};

export const getAllGroups = async () => {
  try {
    const groups = await Group.findAll();
    return groups;
  } catch (err: any) {
    console.log(err)
  }
};

export const getGroupById = async (id: string) => {
  try {
    const group = await Group.findAll({
      where: {
        id,
      }
    });
    return group;
  } catch (err: any) {
    console.log(err)
  }
};

export const updateGroupById = async (id: string, name: string) => {
  try {
    const group = await Group.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      },
    );
    return group;
  } catch (err: any) {
    console.log(err)
  }
};

export const deleteGroupById = async (id: string) => {
  try {
    const group = await Group.destroy({
      where: {
        id,
      },
    });
    return group;
  } catch (err: any) {
    console.log(err)
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

    await t.commit();

  } catch (err: any) {
    await t.rollback();
    throw err;
  }
};
