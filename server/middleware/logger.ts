import { Request, Response, NextFunction } from 'express';

import { logger } from "../logger/logger";

export const loggerMiddleware = (
  { url, body, query, method, params }: Request,
  res: Response,
  next: NextFunction
) => {
  let message = `url=${url}, method=${method}, ${
    Object.keys(body).length ? `body: ${JSON.stringify(body)},` : ''
  } ${Object.keys(query).length ? `query: ${JSON.stringify(query)},` : ''} ${
    Object.keys(params).length ? `query: ${JSON.stringify(params)}` : ''
  }`;

  logger.info(`${message} at ${new Date()}`);
  next();
};