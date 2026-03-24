// riesgosController.ts

import { Request, Response } from 'express';
import Risk from '../models/riskModel';

// Create a new risk
export const createRisk = async (req: Request, res: Response) => {
    try {
        const newRisk = await Risk.create(req.body);
        res.status(201).json(newRisk);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all risks
export const getAllRisks = async (req: Request, res: Response) => {
    try {
        const risks = await Risk.find();
        res.status(200).json(risks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single risk
export const getRiskById = async (req: Request, res: Response) => {
    try {
        const risk = await Risk.findById(req.params.id);
        if (!risk) return res.status(404).json({ message: 'Risk not found' });
        res.status(200).json(risk);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a risk
export const updateRisk = async (req: Request, res: Response) => {
    try {
        const risk = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!risk) return res.status(404).json({ message: 'Risk not found' });
        res.status(200).json(risk);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a risk
export const deleteRisk = async (req: Request, res: Response) => {
    try {
        const risk = await Risk.findByIdAndDelete(req.params.id);
        if (!risk) return res.status(404).json({ message: 'Risk not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};