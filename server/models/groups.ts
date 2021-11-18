import { DataTypes, Op } from 'sequelize';

import sequelise from '../db/db';

export const op = Op;

export const Groups = sequelise.define(
  'users',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isdeleted: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },  
  {
    timestamps: false,
  }
);