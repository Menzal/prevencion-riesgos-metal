import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import riesgosRoutes from './routes/riesgosRoutes';
import cursosRoutes from './routes/cursosRoutes';
import usuariosRoutes from './routes/usuariosRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/riesgos', riesgosRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido al Sistema de Prevención de Riesgos Laborales',
        version: '1.0.0',
        endpoints: {
            riesgos: '/api/riesgos',
            cursos: '/api/cursos',
            usuarios: '/api/usuarios',
            health: '/health'
        }
    });
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📊 Sistema de Prevención de Riesgos Laborales`);
});

export default app;
