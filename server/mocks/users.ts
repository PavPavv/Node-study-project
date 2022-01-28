import { Request, Response, NextFunction } from 'express';

import { User } from '../types/users';

export const MOCK_USER: User = {
  id: '1',
  login: 'jackW',
  password: '123qwe',
  age: 46,
  isdeleted: false,
};

export const MOCK_DELETED_USER: User = {
  id: '2',
  login: 'magW',
  password: 'qwe123',
  age: 48,
  isdeleted: true,
};

export const MOCK_NEXT: NextFunction = jest.fn();
export const MOCK_JSON = jest.fn();

interface MockResponse {
  status: (code: number) => MockResponse;
  json: (obj: object) => MockResponse;
}

export const MOCK_RESPONSE = () => {
  const res: MockResponse = {
      status(): MockResponse {
          throw new Error('Function not implemented.');
      },
      json(): MockResponse {
          throw new Error('Function not implemented.');
      },
  };

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as unknown as Response;
};