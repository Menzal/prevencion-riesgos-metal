import { Router } from 'express';
import { 
    createCourse, 
    getCourse, 
    updateCourse, 
    deleteCourse,
    getAllCourses,
    enrollUserInCourse 
} from '../controllers/cursosController';

const router = Router();

router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/enroll', enrollUserInCourse);

export default router;
