import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser, getUserCourses } from '../controllers/userController';

const router = Router();

// Create a new user
router.post('/users', createUser);

// Get a user by ID
router.get('/users/:id', getUser);

// Update a user by ID
router.put('/users/:id', updateUser);

// Delete a user by ID
router.delete('/users/:id', deleteUser);

// Get courses for a user
router.get('/users/:id/courses', getUserCourses);

export default router;