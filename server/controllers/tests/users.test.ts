import { getMockReq, getMockRes } from '@jest-mock/express';

import sequelise from '../../db/db';
import * as usersControllers from '../users';
import * as usersServices from '../../services/users';
import { StatusCodesEnum } from '../../constants/statuseCodes';


describe('users controllers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  //  close the database connection after all the tests
  afterAll(async () => {
    await sequelise.close();
  });

  test('getDeletedUsers', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'getSoftlyDeletedUsersService');
    mockUsersService.mockImplementation(() => Promise.resolve([]));
    const req = getMockReq({});
    const { res, next } = getMockRes();

    await usersControllers.getDeletedUsers(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });

  test('getUsers', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'getUsersService');
    mockUsersService.mockImplementation(() => Promise.resolve([]));
    const req = getMockReq({});
    const { res, next } = getMockRes();

    await usersControllers.getUsers(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });

  test('getUserById', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'findUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ params: { id: '123' } });
    const { res, next } = getMockRes();

    await usersControllers.getUserById(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });
  
  test('getUserByLogin', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'findUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ body: { login: 'aaa' } });
    const { res, next } = getMockRes();

    await usersControllers.getUserByLogin(
      req,
      res,
      next
    );


    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });
  
  test('createUser', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'createUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ body: { login: 'aaa', password: '1123', age: '20' } });
    const { res, next } = getMockRes();

    await usersControllers.createUser(
      req,
      res,
      next
    );


    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.SuccessfullyCreated);
    expect(next).toBeCalled();
  });
  
  test('updateUserById success', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'updateUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq(
      { 
        params: {id: 'test'},
        body: { login: 'aaa', password: '1123', age: '20' } 
      }
    );
    const { res, next } = getMockRes();

    await usersControllers.updateUserById(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });
  
  test('updateUserById error (should return an error)', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'updateUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve(false));
    const req = getMockReq(
      { 
        params: {id: 'test'},
        body: { login: 'aaa', password: '1123' } 
      }
    );
    const { res, next } = getMockRes();

    await usersControllers.updateUserById(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.InternalServerError);
  });

  test('deleteUserById', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'deleteUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq(
      { 
        params: {id: 'test'},
      }
    );
    const { res, next } = getMockRes();

    await usersControllers.deleteUserById(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });

  test('deleteUserById error (should return an error)', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'deleteUserService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve(false));
    const req = getMockReq(
      { 
        params: {id: 'test'},
      }
    );
    const { res, next } = getMockRes();

    await usersControllers.deleteUserById(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.InternalServerError);
  });
  
  
  test('autoSuggest', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'autoSuggestUsersService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve([]));
    const req = getMockReq(
      { 
        query: {
          limit: 4,
          loginSubstring: 'tes',
        }
      }
    );
    const { res, next } = getMockRes();

    await usersControllers.autoSuggest(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });
  
  test('addToGroup', async () => {
    const mockUsersService = jest.spyOn(usersServices, 'addToGroupService');
    mockUsersService.mockImplementation((): Promise<any> => Promise.resolve([]));
    const req = getMockReq(
      { 
        body: {
          groupId: 'test0',
          userId: 'test1',
        }
      }
    );
    const { res, next } = getMockRes();

    await usersControllers.addToGroup(
      req,
      res,
      next
    );

    expect(mockUsersService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });


});

