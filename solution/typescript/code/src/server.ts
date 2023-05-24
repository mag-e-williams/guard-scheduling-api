import express from "express";
import { exampleRouter } from "./endpoints/example";

const app = express();
app.use(express.json());
app.use("/", exampleRouter);

export default app;