import { DataTypes } from 'sequelize';

import sequelise from '../db/db';
import { Group } from './groups';
import { User } from './users';

export const UserGroup = sequelise.define(
  'UserGroups',
  {

    userId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },

    groupId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: Group,
        key: 'id',
      },
    },
  },

  {
    tableName: 'users_groups',
  },
); 

User.belongsToMany(Group, { through: UserGroup, });
Group.belongsToMany(User, { through: UserGroup, });