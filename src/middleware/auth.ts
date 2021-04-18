import { Response, Request, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../types/user';

export const protect = (req: Request, res: Response, next: NextFunction) => passport.authenticate('jwt', { session: false }, (
  err,
  user,
  info,
) => {
  if (err) {
    return next(info);
  }
  if (!user) {
    return res.status(401).json({
      error: {
        message: 'Not Authorized',
        name: 'AUTHENTICATION_FAILURE',
      },
      sucess: false,
    });
  }
  req.user = user;
  return next();
})(req, res, next);
