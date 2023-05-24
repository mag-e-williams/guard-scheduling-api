import express from "express";
import { exampleRouter } from "./endpoints/example/example";
import { contractsRouter } from "./endpoints/contracts";
import { guardsRouter } from "./endpoints/guards";
import { schedulesRouter } from "./endpoints/schedules";

const app = express();
app.use(express.json());
app.use("/", exampleRouter);
app.use("/", contractsRouter);
app.use("/", guardsRouter);
app.use("/", schedulesRouter);

export default app;