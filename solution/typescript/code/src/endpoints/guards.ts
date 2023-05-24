import express, { Request, Response } from "express";

export const guardsRouter = express.Router();

guardsRouter.get("/guards", async (req: Request, res: Response) => {
    return res.status(200).json( "Hello Guards" );
});