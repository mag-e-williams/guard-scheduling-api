/*
-   Implement REST endpoints for the `/schedule` resource.
    - Allows only GET operations. ✅︎
    - Takes two parameters, a start date and end date, to define the range to return the schedule for. ✅︎
    - Returns a representation of all of the shifts that fall within the date range with the name of guard assigned to it 
    - - (or error message if unable to find a guard).
    - Document how this scheduling algorithm works.
*/

import express, { Request, Response } from "express";
import { schedule as schedules } from '../sampleData/Schedule';

export const schedulesRouter = express.Router();

// GET all schedules
schedulesRouter.get("/schedules", async (req: Request, res: Response) => {
    return res.status(200).json(schedules);
});

// GET a specific schedule by name
schedulesRouter.get('/schedules/:startDate/:endDate', (req: Request, res: Response) => {
    const { startDate, endDatae } = req.params;
    // TODO: fix logic
    // SHOULD:
    // Take two parameters, a start date and end date, to define the range to return the schedule for.
    // Return a representation of all of the shifts that fall within the date range with the name of guard assigned to it.
    const schedule = schedules.find((s) => s[0] === new Date(startDate));
  
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ message: 'No Schedules Found' });
    }
});

