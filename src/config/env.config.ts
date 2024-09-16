import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const envConfig: ConfigModuleOptions = {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: Joi.number().port(),
    DB_NAME: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_PORT: Joi.number().port().default(3306),
    REDIS_PORT: Joi.number().port().default(6379),
    REDIS_HOST: Joi.string(),
    REDIS_PASSWORD: Joi.string().required(),
  }),
};
