import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';  

import * as UsersDataAccess from '../data-access/users';
import { errors } from '../constants/errors';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;
  
  try {
    if (login && password) {
      console.log('AAAAAAAA!')
      const currentUser = await UsersDataAccess.getActualUserByLogin(login);
      if (!currentUser) {
        return res.status(404).json({ message: errors.BAD_LOGIN_OR_PASSWORD })
      }

      const token = sign({ login, }, process.env.KEY || '', {
        expiresIn: '24h'
      });

      res.json({ token });
      next();
      return;
    }

    return res.status(404).json({ message: errors.FAILED_TO_AUTHENTICATE })
  } catch (err) {
    next(err)
  }
};