import { DataTypes, Op } from 'sequelize';

import sequelise from '../db/db';

export const op = Op;

export const Group = sequelise.define(
  'group',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },  
  {
    timestamps: false,
  }
);

Group.sync();