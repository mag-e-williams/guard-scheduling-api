/*
-   Implement REST endpoints for the `/pto` resource
    - Allows only PUT operations. ✅︎ (I also made a few get ops)
    - Takes two parameters, a guard name and date to request off (guards can only request off one day at a time). ✅︎
*/

import express, { Request, Response } from "express";
import { PTOSchedule as pto } from '../sampleData/PTOSchedule';
import { PTO } from "@exmpl/types/PTO";

export const ptoRouter = express.Router();

// GET all PTO
ptoRouter.get("/pto", async (req: Request, res: Response) => {
    return res.status(200).json(pto);
});

// GET all PTO for :employee
ptoRouter.get("/pto/:employee", async (req: Request, res: Response) => {
  console.log(req.params)
  const { employee } = req.params;
  const emplyeePto = pto.find((p) => p.name === employee);

  if (emplyeePto) {
    res.json(emplyeePto);
  } else {
    res.status(404).json({ message: `No PTO found for employee ${employee}` });
  }
});

// CREATE a PTO instance for an employee
ptoRouter.post("/pto", async (req: Request, res: Response) => {
  const { guardName, date } = req.body;

  if (!guardName || !date) {
    return res.status(400).json({ error: 'Guard name and date are required' });
  }

  // Check if the guard already has a PTO request for the given date
  const existingRequest = pto.find((request) => request.name === guardName && request.date === date);
  if (existingRequest) {
    return res.status(409).json({ error: 'PTO request already exists for the guard and date' });
  }

  // Create a new PTO request object and add it to the storage
  const ptoRequest: PTO = { name: guardName, date: new Date(date) };
  pto.push(ptoRequest);

  res.json(ptoRequest);
});