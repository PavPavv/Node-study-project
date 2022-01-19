import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { StatusCodesEnum } from '../constants/statuseCodes'
import { errors } from '../constants/errors';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(' ')[1]

  if (!token || typeof token !== 'string') {
    return res.status(StatusCodesEnum.Unauthorized).send({ success: false, message: errors.NO_TOKEN_PROVIDED });
  }

  try {
    verify(token as string, process.env.KEY as string);
  } catch (err) {
    console.log('err',err)
    return res.status(StatusCodesEnum.Forbidden).send({ success: false, message: errors.FAILED_TO_AUTHENTICATE });
  }

  next(); 
};