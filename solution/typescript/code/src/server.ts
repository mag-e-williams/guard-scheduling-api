import express from "express";
import { contractsRouter } from "./endpoints/contracts";
import { guardsRouter } from "./endpoints/guards";
import { schedulesRouter } from "./endpoints/schedules";
import { ptoRouter } from "./endpoints/pto";

const app = express();
app.use(express.json());
app.use("/", contractsRouter);
app.use("/", guardsRouter);
app.use("/", schedulesRouter);
app.use("/", ptoRouter);

export default app;