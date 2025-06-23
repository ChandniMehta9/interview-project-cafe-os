import process from 'node:process';

export interface CafeOSEnvironment {
  DB_FILE_NAME: string;
}

type EnvironmentType = 'production' | 'staging' | 'test' | 'development' | void;

export function createEnvironmentConfig(_environment: EnvironmentType = 'development'): CafeOSEnvironment {
  const {
    DB_FILE_NAME
  } = process.env;

  return {
    DB_FILE_NAME
  };
}

export const defaultConfig = createEnvironmentConfig(process.env.NODE_ENVIRONMENT as EnvironmentType);

export default defaultConfig;
