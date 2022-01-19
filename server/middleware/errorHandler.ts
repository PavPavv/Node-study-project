import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { ValidationError } from 'joi';

import { logger } from '../logger/logger';

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof UniqueConstraintError) {
    res
      .status(409)
      .json({ message: error.message });

    return;
  }

  if (error instanceof ValidationError && error.isJoi) {
    res
      .status(400)
      .json({ message: error.details, });

    return;
  }

  logger.error(error);
};