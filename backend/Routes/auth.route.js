import express from 'express';
import { signIn,signUp,signOut } from '../Controller/auth.Controller.js';

const router = express.Router();

router.post('/signup',signUp)
router.post('/signin', signIn);
router.get('/signout',signOut)

export default router;
