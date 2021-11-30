import { DataTypes, Op } from 'sequelize';

import sequelise from '../db/db';

export const op = Op;

export const User = sequelise.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },  
  {
    timestamps: false,
  }
);
User.sync();