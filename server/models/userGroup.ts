import { userInfo } from 'os';
import { DataTypes } from 'sequelize';

import sequelize from '../db/db';
import { Group } from './groups';
import { User } from './users';

export const UserGroup = sequelize.define(
  'user_groups',
  {

    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },

    groupId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Group,
        key: 'id',
      },
    },
  },
  {
    tableName: 'user_groups', 
    timestamps: true, 
  },
);
UserGroup.sync();

User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId'});
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId'});

