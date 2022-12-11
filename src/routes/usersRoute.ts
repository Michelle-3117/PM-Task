import { Router } from 'express';
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from '../controllers/userController';
import { auth } from '../middleware/auth';


const router = Router();

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/getsingleuser/:id', auth, getSingleUser);
router.get('/getallusers', auth, getAllUsers);
router.patch('/updateuser/:id', auth,  updateUser);
router.delete('/deleteuser/:id', auth, deleteUser);

export default router