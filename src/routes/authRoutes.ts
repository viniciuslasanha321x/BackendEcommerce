import { Router } from 'express';

import {
  login,
  signUp,
  getMe,
} from '../controllers/authController';
import { protect } from '../middleware';
import {
  validate,
  loginValidation,
  signUpValidation,
} from '../validation';

const router = Router();

router.route('/signup').post(signUpValidation(), validate, signUp);
router.route('/login').post(loginValidation(), validate, login);

router.use(protect);

router.route('/me').get(getMe);

export { router as authRoutes };
