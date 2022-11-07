import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { loginData, signupData } from '../interfaces/interfaces';

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  };
};

export const Schemas = {
  login: Joi.object<loginData>({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  }),
  signup: Joi.object<signupData>({
    username: Joi.string()
      .min(3)
      .custom((value, helpers) => {
        if (/^\d/.test(value))
          // @ts-ignore:next-line
          return helpers.message('username cannot start with a number.');
        return value;
      })
      .required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .messages({ 'string.pattern.base': `Invalid phone number.` })
      .required(),
    location: Joi.string().required(),
  }),
};
