import express, { Request, Response } from "express";

export const contractsRouter = express.Router();

contractsRouter.get("/contracts", async (req: Request, res: Response) => {
    return res.status(200).json( "Hello Contracts" );
});