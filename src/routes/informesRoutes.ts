import { Router } from 'express';
import {
    getAllInformes,
    getInformeById,
    getUltimoInforme,
    createInforme
} from '../controllers/informesController';

const router = Router();

// GET /api/informes          → Todos los informes semanales
router.get('/', getAllInformes);

// GET /api/informes/ultimo   → El informe más reciente
router.get('/ultimo', getUltimoInforme);

// GET /api/informes/:id      → Informe por ID con sus novedades
router.get('/:id', getInformeById);

// POST /api/informes         → Crear nuevo informe
router.post('/', createInforme);

export default router;
