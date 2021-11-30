import { userInfo } from 'os';
import { DataTypes } from 'sequelize';

import sequelize from '../db/db';
import { Group } from './groups';
import { User } from './users';

export const UserGroup = sequelize.define(
  'user_groups',
  {

    UserId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },

    GroupId: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: 'id',
      },
    },
  },
);
UserGroup.sync();

User.belongsToMany(Group, { through: UserGroup, });
Group.belongsToMany(User, { through: UserGroup, });

