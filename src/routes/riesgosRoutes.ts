import { Router } from 'express';
import { 
    createRisk, 
    getRisk, 
    updateRisk, 
    deleteRisk, 
    getAllRisks 
} from '../controllers/riesgosController';

const router = Router();

// Create a new risk
router.post('/risks', createRisk);

// Get a specific risk by ID
router.get('/risks/:id', getRisk);

// Update a specific risk by ID
router.put('/risks/:id', updateRisk);

// Delete a specific risk by ID
router.delete('/risks/:id', deleteRisk);

// Get all risks
router.get('/risks', getAllRisks);

export default router;
