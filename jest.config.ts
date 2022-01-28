import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/server'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'server/controllers/users.ts',
    'server/controllers/groups.ts'
  ],
}

export default config;