import request from 'supertest';
import moment from 'moment';
import { schedulesRouter } from '../schedules';
import express, { Request, Response } from "express";

const app = express();
app.use('/', schedulesRouter);

const baseURL = "http://localhost:3000"
const endpointPath = "/guards"

describe("GET /guards", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(endpointPath);
    expect(response.statusCode).toBe(200);
  });

  it("should return all guards", async () => {
    const response = await request(baseURL).get(endpointPath);
    expect(response.body.data.length >= 1).toBe(true);
  });
});

