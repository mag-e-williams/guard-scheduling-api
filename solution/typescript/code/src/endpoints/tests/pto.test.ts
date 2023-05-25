import request from 'supertest';
import moment from 'moment';
import { schedulesRouter } from '../schedules';
import express, { Request, Response } from "express";

const app = express();
app.use('/', schedulesRouter);

const baseURL = "http://localhost:3000"
const endpointPath = "/pto"

describe("GET /pto", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(endpointPath);
    expect(response.statusCode).toBe(200);
  });

  it("should return all pto", async () => {
    const response = await request(baseURL).get(endpointPath);
    expect(response.body.data.length >= 1).toBe(true);
  });

  it("should return a guards PTO", async () => {
    const guardName = "Jackson";
    const response = await request(baseURL).get(endpointPath + '/' + guardName);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length >= 1).toBe(true);
  });

  it("should return an Error", async () => {
    const GuardName = "Sally";
    const response = await request(baseURL).get(endpointPath + '/' + GuardName);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No PTO found for employee: " + GuardName);
  });
});


describe('POST /pto', () => {
  it('should return an Error', async () => {
    const newPto = {
      guardName: '',
      dateStr: '',
    };

    const response = await request(baseURL)
      .post('/pto')
      .send(newPto);
    
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Guard name and date are required");
  });
});
