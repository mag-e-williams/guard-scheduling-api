/*
-   Implement a custom contract model with fields corresponding to the above definition.
    - Implement endpoints to get, create, and delete contracts. ✅︎
    - Contracts begin on the day they are created. ✅︎
    - Choose the data type for each field that makes the most sense. ✅︎
*/

import express, { Request, Response } from "express";
import { Contract } from '../types/Contract';
import { contractsData } from "../sampleData/contractsData";
import moment from "moment";

export const contractsRouter = express.Router();

// Get all contracts
contractsRouter.get("/contracts", async (req: Request, res: Response) => {
    return res.status(200).json({data: contractsData});
});

// GET a specific contract by name
contractsRouter.get('/contracts/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const contract = contractsData.find((c) => c.name === name);
  
    if (contract) {
        res.json({data: contract});
    } else {
        res.status(404).json({ message: `No contracts found with name: ${name}` });
    }
});

// CREATE a new contract
contractsRouter.post('/contracts', (req: Request, res: Response) => {
    let { name, daysOfWeek, requiresArmedGuard, startDate } = req.body;
    startDate = startDate || moment().format('MM-DD-YYY');
    const newContract: Contract = { name, daysOfWeek, requiresArmedGuard, startDate };
    contractsData.push(newContract);
    res.status(201).json({data: newContract});
});

// DELETE a contract
contractsRouter.delete('/contracts/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const contracatIndex = contractsData.findIndex((c) => c.name === name);

    if (contracatIndex !== -1) {
        const deletedContract = contractsData.splice(contracatIndex, 1)[0];
        res.json({data: deletedContract});
    } else {
        res.status(404).json({ message: `No contracts found with name: ${name}` });
    }
});