import { v4 as uuidv4 } from 'uuid';

import { Group } from '../types/group';
import * as GroupsDataAccess from '../data-access/groups';

export const getGroupsService = async () => {
  const groups  = await GroupsDataAccess.getAllGroups();
  if (groups) {
    return groups ? groups : null;
  }
};

export const getGroupByIdService = async (id: string) => {
  const group  = await GroupsDataAccess.getGroupById(id);
  if (group) {
    return group ? group : null;
  }
};

export const createNewGroupService = async (name: string) => {
  const newGroup: Group = {
    id: uuidv4(),
    name,
    permission: ['READ'],
  };

  const createdGroup = await GroupsDataAccess.createGroup(newGroup);
  if (createdGroup) {
    return createdGroup ? createdGroup : null;
  }
};

export const updateGroupByIdService = async (id: string, name: string) => {
  const updatedGroup = await GroupsDataAccess.updateGroupById(id, name);
  if (updatedGroup) {
    return updatedGroup ? updatedGroup : null;
  }
};

export const deleteGroupByIdService = async (id: string) => {
  const deletedGroup = await GroupsDataAccess.deleteGroupById(id);;
  if (deletedGroup) {
    return deletedGroup ? deletedGroup : null;
  }
};