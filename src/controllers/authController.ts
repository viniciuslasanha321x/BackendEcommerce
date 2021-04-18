import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config';
import { User as UserType } from '../types/user';
import { User, UserDocument } from '../models/User';

export const sendResponseToken = ({
  user,
  res,
  statusCode,
}: {
   user: UserType | UserDocument;
   statusCode:number;
   res: Response;
}) => {
  const payload = {
    user_id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(statusCode).json({ data: { user, token }, sucess: true });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('login', { session: false }, (
    err,
    user,
    info,

  ) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    sendResponseToken({ user, res, statusCode: 200 });
  })(req, res, next);
};

export const signUp = async (
  req:Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('signUp', { session: false }, (
    err,
    user,
    info,
  ) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    console.log('To aqui');

    sendResponseToken({ user, res, statusCode: 201 });
  })(req, res, next);
};

export const getMe = async (req:Request, res:Response) => {
  res.status(200).json({ data: { user: req.user } });
};
