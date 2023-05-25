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

  it("should return single guard", async () => {
    const guardName = "Jackson";
    const response = await request(baseURL).get(endpointPath + '/' + guardName);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe(guardName);
  });

  it("should return an Error", async () => {
    const GuardName = "Sally";
    const response = await request(baseURL).get(endpointPath + '/' + GuardName);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No guards found with name: " + GuardName);
  });
});


describe('POST /guards', () => {
  it('should create a new guard', async () => {
    const newGuardName = 'New Guard';

    // Assert guard DNE 
    let getResponse = await request(baseURL).get(endpointPath + '/' + newGuardName);
    expect(getResponse.statusCode).toBe(404);

    // Create new guard  
    const newGuard = {
      name: newGuardName,
      hasArmedGuardCredential: true,
    };

    const response = await request(baseURL)
      .post('/guards')
      .send(newGuard);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toEqual({
      name: newGuard.name,
      hasArmedGuardCredential: newGuard.hasArmedGuardCredential,
    });

    // Assert new guard exists 
    getResponse = await request(baseURL).get(endpointPath + '/' + newGuardName);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.data.name).toBe(newGuardName);

    // Revert
    await request(baseURL).delete(endpointPath + '/' + newGuardName);
  });
});


describe("DELETE /guards", () => {
  it("should delete a Guard", async () => {
    const guardName = "Jackson";

    // Assert guard exists 
    let getResponse = await request(baseURL).get(endpointPath + '/' + guardName);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.data.name).toBe(guardName);

    // Delete
    const delResponse = await request(baseURL).delete(endpointPath + '/' + guardName);
    expect(delResponse.statusCode).toBe(200);
    expect(delResponse.body.data.name).toBe(guardName);

    // Assert delete was successful 
    getResponse = await request(baseURL).get(endpointPath + '/' + guardName);
    expect(getResponse.statusCode).toBe(404);

    // Revert 
    getResponse = await request(baseURL).post(endpointPath).send(delResponse.body.data);
  });

  it("should return an Error", async () => {
    const guardName = "New Guard";

    // Guard DNE
    const getResponse = await request(baseURL).get(endpointPath + '/' + guardName);
    expect(getResponse.statusCode).toBe(404);

    // Delete
    const response = await request(baseURL).delete(endpointPath + '/' + guardName);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No guards found with name: " + guardName);
  });

});


