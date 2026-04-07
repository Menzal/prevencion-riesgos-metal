import { Request, Response } from 'express';
import pool from '../config/database';

/**
 * GET /api/informes
 * Devuelve todos los informes semanales, ordenados del más reciente al más antiguo.
 */
export const getAllInformes = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `SELECT id, semana_inicio, semana_fin, titulo, ambito, resumen, url_pdf, created_at
             FROM informes_semanales
             ORDER BY semana_inicio DESC`
        );
        res.status(200).json(result.rows);
    } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener los informes', message: error.message });
    }
};

/**
 * GET /api/informes/:id
 * Devuelve un informe concreto junto con todas sus novedades.
 */
export const getInformeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const informeResult = await pool.query(
            `SELECT * FROM informes_semanales WHERE id = $1`,
            [id]
        );
        if (informeResult.rows.length === 0) {
            res.status(404).json({ error: 'Informe no encontrado' });
            return;
        }
        const novedadesResult = await pool.query(
            `SELECT * FROM novedades_informe WHERE informe_id = $1 ORDER BY urgencia DESC, fecha_publicacion DESC`,
            [id]
        );
        res.status(200).json({
            informe: informeResult.rows[0],
            novedades: novedadesResult.rows
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener el informe', message: error.message });
    }
};

/**
 * GET /api/informes/ultimo
 * Devuelve el informe más reciente junto con sus novedades.
 */
export const getUltimoInforme = async (req: Request, res: Response): Promise<void> => {
    try {
        const informeResult = await pool.query(
            `SELECT * FROM informes_semanales ORDER BY semana_inicio DESC LIMIT 1`
        );
        if (informeResult.rows.length === 0) {
            res.status(404).json({ error: 'No hay informes disponibles' });
            return;
        }
        const informe = informeResult.rows[0];
        const novedadesResult = await pool.query(
            `SELECT * FROM novedades_informe WHERE informe_id = $1 ORDER BY urgencia DESC, fecha_publicacion DESC`,
            [informe.id]
        );
        res.status(200).json({
            informe,
            novedades: novedadesResult.rows
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Error al obtener el último informe', message: error.message });
    }
};

/**
 * POST /api/informes
 * Crea un nuevo informe semanal.
 */
export const createInforme = async (req: Request, res: Response): Promise<void> => {
    const { semana_inicio, semana_fin, titulo, ambito, resumen, contenido_md, url_pdf } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO informes_semanales (semana_inicio, semana_fin, titulo, ambito, resumen, contenido_md, url_pdf)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [semana_inicio, semana_fin, titulo, ambito, resumen, contenido_md, url_pdf]
        );
        res.status(201).json(result.rows[0]);
    } catch (error: any) {
        res.status(400).json({ error: 'Error al crear el informe', message: error.message });
    }
};
