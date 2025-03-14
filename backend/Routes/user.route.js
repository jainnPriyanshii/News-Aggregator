import express from 'express'
import {updateUser,deleteUser} from '../Controller/user.Controller.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)


export default router