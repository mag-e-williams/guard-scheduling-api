import express, { Request, Response } from "express";

export const exampleRouter = express.Router();

exampleRouter.get("/hello", async (req: Request, res: Response) => {
    return res.status(200).json( "Hello World" );
});