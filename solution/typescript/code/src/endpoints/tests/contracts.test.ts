
import request from 'supertest';
import { schedulesRouter } from '../schedules';
import express, { Request, Response } from "express";
import moment from 'moment';

const app = express();
app.use('/', schedulesRouter);

const baseURL = "http://localhost:3000"
const endpointPath = "/contracts"

describe("GET /contracts", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(endpointPath);
    expect(response.statusCode).toBe(200);

  });

  it("should return all contracts", async () => {
    const response = await request(baseURL).get(endpointPath);
    expect(response.body.data.length >= 1).toBe(true);
  });

  it("should return single contract", async () => {
    const contractName = "WTC";
    const response = await request(baseURL).get(endpointPath + '/' + contractName);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe(contractName);
  });

  it("should return an Error", async () => {
    const contractName = "Dick's Sporting Goods";
    const response = await request(baseURL).get(endpointPath + '/' + contractName);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No contracts found with name: " + contractName);
  });
});


describe('POST /contracts', () => {
  it('should create a new contract', async () => {
    const newContractName = 'New Contract';

    // Assert contract DNE 
    let getResponse = await request(baseURL).get(endpointPath + '/' + newContractName);
    expect(getResponse.statusCode).toBe(404);

    // Create new contract  
    const newContract = {
      name: newContractName,
      daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
      requiresArmedGuard: true,
    };

    const response = await request(baseURL)
      .post('/contracts')
      .send(newContract);

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toEqual({
      name: newContract.name,
      daysOfWeek: newContract.daysOfWeek,
      requiresArmedGuard: newContract.requiresArmedGuard,
      startDate: moment().format('MM-DD-YYY'),
    });

    // Assert new contract exists 
    getResponse = await request(baseURL).get(endpointPath + '/' + newContractName);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.data.name).toBe(newContractName);

    // Revert
    getResponse = await request(baseURL).delete(endpointPath + '/' + newContractName);
  });
});


describe("DELETE /contracts", () => {
  it("should delete a Contract", async () => {
    const contractName = "WTC";

    // Assert contract exists 
    let getResponse = await request(baseURL).get(endpointPath + '/' + contractName);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.data.name).toBe(contractName);

    // Delete
    const delResponse = await request(baseURL).delete(endpointPath + '/' + contractName);
    expect(delResponse.statusCode).toBe(200);
    expect(delResponse.body.data.name).toBe(contractName);

    // Assert delete was successful 
    getResponse = await request(baseURL).get(endpointPath + '/' + contractName);
    expect(getResponse.statusCode).toBe(404);

    // Revert 
    getResponse = await request(baseURL).post(endpointPath).send(delResponse.body.data);
  });

  it("should return an Error", async () => {
    const contractName = "Dick's Sporting Goods";

    // Contract DNE
    const getResponse = await request(baseURL).get(endpointPath + '/' + contractName);
    expect(getResponse.statusCode).toBe(404);

    // Delete
    const response = await request(baseURL).delete(endpointPath + '/' + contractName);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("No contracts found with name: " + contractName);
  });

});
