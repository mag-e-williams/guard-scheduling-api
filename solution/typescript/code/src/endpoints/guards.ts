/*
-   Implement a custom guard model with fields corresponding to the above definition. 
    - Implement endpoints to get, create, and delete guards. ✅︎
    - Choose the data type for each field that makes the most sense. ✅︎
*/

import express, { Request, Response } from "express";
import { Guard } from '../types/Guard';
import { guards } from '../sampleData/Guards';

export const guardsRouter = express.Router();

// GET all guards
guardsRouter.get("/guards", async (req: Request, res: Response) => {
    return res.status(200).json({data: guards});
});

// GET a specific guard by name
guardsRouter.get('/guards/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const guard = guards.find((g) => g.name === name);
  
    if (guard) {
      res.json(guard);
    } else {
      res.status(404).json({ message: `No guards found with name: ${name}` });
    }
});

// CREATE a new guard
guardsRouter.post('/guards', (req: Request, res: Response) => {
    const { name, hasArmedGuardCredential } = req.body;
    const newGuard: Guard = { name, hasArmedGuardCredential };
    guards.push(newGuard);
    res.status(201).json(newGuard);
});

// DELETE a guard
guardsRouter.delete('/guards/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const guardIndex = guards.findIndex((g) => g.name === name);

    if (guardIndex !== -1) {
        const deletedGuard = guards.splice(guardIndex, 1)[0];
        res.json({deletedGuard});
    } else {
        res.status(404).json({ message: `Unable to delete guard. No guard with name ${name}` });
    }
});