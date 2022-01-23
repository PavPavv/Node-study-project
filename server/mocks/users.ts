import { User } from '../types/users';

export const mockedUser: User = {
  id: '1',
  login: 'lackW',
  password: '123qwe',
  age: 46,
  isdeleted: false,
};

export const mockedNext = jest.fn();
export const mockedJson = jest.fn();