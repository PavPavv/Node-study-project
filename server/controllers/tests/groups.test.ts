import { getMockReq, getMockRes } from '@jest-mock/express';

import sequelise from '../../db/db';
import * as groupsControllers from '../groups';
import * as groupsServices from '../../services/groups';
import { StatusCodesEnum } from '../../constants/statuseCodes';


describe('groups-controller', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  //  close the database connection after all the tests
  afterAll(async () => {
    await sequelise.close();
  });

  test('getGroups', async () => {
    const mockGroupsService = jest.spyOn(groupsServices, 'getGroupsService');
    mockGroupsService.mockImplementation(() => Promise.resolve([]));
    const req = getMockReq({});
    const { res, next } = getMockRes();
    await groupsControllers.getGroups(
      req,
      res,
      next
    );

    expect(mockGroupsService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });

  test('getGroupById', async () => {
    const mockGroupsService = jest.spyOn(groupsServices, 'getGroupByIdService');
    mockGroupsService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ body: { id: '123' } });
    const { res, next } = getMockRes();

    await groupsControllers.getGroupById(
      req,
      res,
      next
    );

    expect(mockGroupsService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });

  test('getGroupById error (should return an error code after error occurred in service)', async () => {
    const mockGroupsService = jest.spyOn(groupsServices, 'getGroupByIdService');
    mockGroupsService.mockImplementation((): Promise<any> => Promise.resolve(false));
    const req = getMockReq({ body: { id: '123' } });
    const { res, next } = getMockRes();

    await groupsControllers.getGroupById(
      req,
      res,
      next
    );

    expect(mockGroupsService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.InternalServerError);
  });
  
  test('createNewGroup', async () => {
    const mockGroupsService = jest.spyOn(groupsServices, 'createNewGroupService');
    mockGroupsService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ body: { name: 'test' } });
    const { res, next } = getMockRes();

    await groupsControllers.createNewGroup(
      req,
      res,
      next
    );

    expect(mockGroupsService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.SuccessfullyCreated);
    expect(next).toBeCalled();
  });
  
  test('updateGroupById', async () => {
    const mockGroupsService = jest.spyOn(groupsServices, 'updateGroupByIdService');
    mockGroupsService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ body: { id: 'test', name: 'test' } });
    const { res, next } = getMockRes();

    await groupsControllers.updateGroupById(
      req,
      res,
      next
    );

    expect(mockGroupsService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });
  
  test('deleteGroupById', async () => {
    const mockGroupsService = jest.spyOn(groupsServices, 'deleteGroupByIdService');
    mockGroupsService.mockImplementation((): Promise<any> => Promise.resolve({}));
    const req = getMockReq({ body: { id: 'test', } });
    const { res, next } = getMockRes();

    await groupsControllers.deleteGroupById(
      req,
      res,
      next
    );

    expect(mockGroupsService).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(StatusCodesEnum.OK);
    expect(next).toBeCalled();
  });
  

});
