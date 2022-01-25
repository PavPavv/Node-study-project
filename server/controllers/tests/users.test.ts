import { Request, Response, NextFunction } from 'express';
import { mocked } from 'ts-jest/utils';

import sequelise from '../../db/db';
import * as userController from '../users';
import * as userDataAccess from '../../data-access/users';
import { mockedNext, mockedJson } from '../../mocks/users';


describe('user-controller', () => {
  //  close the database connection after all the tests
  afterAll(async () => {
    await sequelise.close();
  });

  it('getUsers func should return array of actual users from database', async () => {
    let responseData: [] = [];
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseData = result;
      }),
    };
    await userController.getUsers({} as Request, response as Response, mockedNext);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length > 0).toBe(true);
  });

  it('getDeletedUsers func should return array of softly deleted users from database', async () => {
    let responseData: [] = [];
    const response: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseData = result;
      }),
    };
    await userController.getDeletedUsers({} as Request, response as Response, mockedNext);
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length > 0).toBe(true);
  });

  it('getUserById func should return object with selected user', () => {
    
  });

});

