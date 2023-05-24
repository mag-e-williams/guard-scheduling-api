import request from 'supertest';
import moment from 'moment';
import { schedulesRouter } from '../schedules';
import express, { Request, Response } from "express";

const app = express();
app.use('/', schedulesRouter);

const baseURL = "http://localhost:3000"
const endpointPath = "/schedules"

describe("GET /schedules", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(endpointPath + '/05-23-2023/05-30-2023/');
    expect(response.statusCode).toBe(200);
  });

  it("should return all schedules", async () => {
    const response = await request(baseURL).get(endpointPath + '/05-23-2023/05-30-2023/');
    expect(response.body.data.length >= 1).toBe(true);
  });
});

