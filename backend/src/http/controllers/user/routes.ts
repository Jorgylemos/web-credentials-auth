import { Router } from 'express'
import { RegisterController } from '../register';
import { AuthController } from './authenticate';
import { VerifyJwt } from '../../middleware/verify-jwt';
import { ProfileController } from './profile';

const router = Router();

router.post('/user', RegisterController)
router.post('/auth', AuthController)

router.get('/me/profile', [VerifyJwt], ProfileController)

export { router as UserRoutes }