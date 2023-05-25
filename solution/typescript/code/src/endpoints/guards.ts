/*
-   Implement a custom guard model with fields corresponding to the above definition. 
    - Implement endpoints to get, create, and delete guards. ✅︎
    - Choose the data type for each field that makes the most sense. ✅︎
*/

import express, { Request, Response } from "express";
import { Guard } from '../types/Guard';
import { guardsData } from '../sampleData/guardsData';

export const guardsRouter = express.Router();

// GET all guards
guardsRouter.get("/guards", async (req: Request, res: Response) => {
    return res.status(200).json({data: guardsData});
});

// GET a specific guard by name
guardsRouter.get('/guards/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const guard = guardsData.find((g) => g.name === name);
  
    if (guard) {
      res.json({data: guard});
    } else {
      res.status(404).json({ message: `No guards found with name: ${name}` });
    }
});

// CREATE a new guard
guardsRouter.post('/guards', (req: Request, res: Response) => {
    const { name, hasArmedGuardCredential } = req.body;
    const newGuard: Guard = { name, hasArmedGuardCredential };
    guardsData.push(newGuard);
    res.status(201).json({data: newGuard});
});

// DELETE a guard
guardsRouter.delete('/guards/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const guardIndex = guardsData.findIndex((g) => g.name === name);

    if (guardIndex !== -1) {
        const deletedGuard = guardsData.splice(guardIndex, 1)[0];
        res.json({data: deletedGuard});
    } else {
        res.status(404).json({ message: `No guards found with name: ${name}` });
    }
});