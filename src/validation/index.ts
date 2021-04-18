import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const loginValidation = () => [
  body('email')
    .isEmail()
    .withMessage('Email is not a valid email')
    .trim()
    .escape(),
  body('password')
    .isLength({ min: 8 })
    .trim()
    .escape()
    .withMessage('must be at least 8 chars long'),
];

export const signUpValidation = () => [
  body('name')
    .isLength({ min: 4 })
    .withMessage('password must be at least 8 char long')
    .trim()
    .escape(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Object[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    message: 'The given data was invalid',
    errors: extractedErrors,
  });
};
