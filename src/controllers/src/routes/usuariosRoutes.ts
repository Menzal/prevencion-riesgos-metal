import { Router } from 'express';
import { 
    createUser, 
    getUser, 
    updateUser, 
    deleteUser,
    getAllUsers,
    getUserCourses 
} from '../controllers/usuariosController';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/courses', getUserCourses);

export default router;
