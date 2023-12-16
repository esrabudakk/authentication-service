import { config } from 'dotenv';

export namespace ConfigService {
  config();

  export const getEnvVariableOrFail = (key: string) => {
    const envVariable = process.env[key];

    if (!envVariable) {
      throw new Error(`Environment variable with key: ${key} is missing`);
    }

    return envVariable;
  }
}