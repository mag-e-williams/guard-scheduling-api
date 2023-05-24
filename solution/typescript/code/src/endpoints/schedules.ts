import express, { Request, Response } from "express";

export const schedulesRouter = express.Router();

schedulesRouter.get("/schedules", async (req: Request, res: Response) => {
    return res.status(200).json( "Hello Schedules" );
});