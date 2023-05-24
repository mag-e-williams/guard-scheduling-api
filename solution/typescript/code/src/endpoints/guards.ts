import express, { Request, Response } from "express";
import { Guard } from '../types/Guard';

export const guardsRouter = express.Router();

// Sample guards data
const guards: Guard[] = [
    { name: 'Jackson', hasArmedGuardCredential: false },
    { name: 'Smith', hasArmedGuardCredential: true },
];

// Get all guards
guardsRouter.get("/guards", async (req: Request, res: Response) => {
    return res.status(200).json(guards);
});

// Get a specific guard by name
guardsRouter.get('/guards/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const guard = guards.find((g) => g.name === name);
  
    if (guard) {
      res.json(guard);
    } else {
      res.status(404).json({ message: 'Guard not found' });
    }
});

// Create a new guard
guardsRouter.post('/guards', (req: Request, res: Response) => {
    const { name, hasArmedGuardCredential } = req.body;
    const newGuard: Guard = { name, hasArmedGuardCredential };
    guards.push(newGuard);
    res.status(201).json(newGuard);
});

// Delete a guard
guardsRouter.delete('/guards/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const guardIndex = guards.findIndex((g) => g.name === name);

    if (guardIndex !== -1) {
        const deletedGuard = guards.splice(guardIndex, 1)[0];
        res.json(deletedGuard);
    } else {
        res.status(404).json({ message: 'Guard not found' });
    }
});