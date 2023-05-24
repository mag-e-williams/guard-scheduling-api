/*
-   Implement a custom contract model with fields corresponding to the above definition.
    - Implement endpoints to get, create, and delete contracts. ✅︎
    - Contracts begin on the day they are created. ✅︎
    - Choose the data type for each field that makes the most sense. ✅︎
*/

import express, { Request, Response } from "express";
import { Contract } from '../types/Contract';
import { contracts } from '../sampleData/Contracts';
import moment from "moment";

export const contractsRouter = express.Router();

// Get all contracts
contractsRouter.get("/contracts", async (req: Request, res: Response) => {
    return res.status(200).json(contracts);
});

// GET a specific contract by name
contractsRouter.get('/contracts/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const contract = contracts.find((c) => c.name === name);
  
    if (contract) {
      res.json(contract);
    } else {
      res.status(404).json({ message: `No contracts found with name: ${name}` });
    }
});

// CREATE a new contract
contractsRouter.post('/contracts', (req: Request, res: Response) => {
    const { name, daysOfWeek, requiresArmedGuard } = req.body;
    const startDate = moment().format('MM-DD-YYY');
    const newContract: Contract = { name, daysOfWeek, requiresArmedGuard, startDate };
    contracts.push(newContract);
    res.status(201).json(newContract);
});

// DELETE a contract
contractsRouter.delete('/contracts/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const contracatIndex = contracts.findIndex((c) => c.name === name);

    if (contracatIndex !== -1) {
        const deletedContract = contracts.splice(contracatIndex, 1)[0];
        res.json(deletedContract);
    } else {
        res.status(404).json({ message: `Unable to delete contract. No contract with name ${name}` });
    }
});