import request from 'supertest';
import moment from 'moment';
import { schedulesRouter } from '../schedules';
import express, { Request, Response } from "express";
import { Contract } from '@exmpl/types/Contract';
import { generateShifts, ScheduleShifts } from '../schedules';
import { contracts_1, shifts_1, startDate_1, endDate_1, guards_1, pto_1 } from './testData/scheduleTestData_1';
import { contracts_2, shifts_2, startDate_2, endDate_2, guards_2, pto_2 } from './testData/scheduleTestData_2';
import { PTO } from '@exmpl/types/PTO';

const app = express();
app.use('/', schedulesRouter);

const baseURL = "http://localhost:3000"
const endpointPath = "/schedules"


describe("GET /schedules", () => {
  it("should return 200", async () => {
    const startDate = '05-23-2023'
    const endDate = '05-23-2023'

    const response = await request(baseURL).get(endpointPath + `/${startDate}/${endDate}/`);
    expect(response.statusCode).toBe(200);
  });

  it("should return all schedules", async () => {
    const startDate = '07-23-2023'
    const endDate = '07-30-2023'

    const response = await request(baseURL).get(endpointPath + `/${startDate}/${endDate}/`);
    expect(response.body.data.length >= 1).toBe(true);
  });

  it("should return all error", async () => {
    const startDate = '05-23-2020'
    const endDate = '05-23-2020'

    const response = await request(baseURL).get(endpointPath + `/${startDate}/${endDate}/`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No Schedules Found');
  });
});


describe('Test generateShifts', () => {
  it('should generate shifts for the given date range and contracts', () => {

    // Call the generateShifts function
    let shifts = generateShifts(startDate_1, endDate_1, contracts_1);
    expect(shifts).toEqual(shifts_1);


    shifts = generateShifts('02-22-2023', '02-30-2023', contracts_2);
    expect(shifts).toEqual(shifts_2);
  });
});

describe('ScheduleShifts', () => {
  it('should properly schedule shifts', () => {

    const scheduledShifts = ScheduleShifts({
      contractsData: contracts_1,
      guardsData: guards_1,
      ptoScheduleData: pto_1,
      startDate: startDate_1,
      endDate: endDate_1,
    });

    expect(scheduledShifts).toEqual(
      [
        [
        "Smith",
        "The Grove",
        "Sat",
        "07-29-2023"
        ],
        [
        "No Guards Available",
        "Westfield Mall",
        "Sat",
        "07-29-2023"
        ],
        [
        "Jackson",
        "Westfield Mall",
        "Wed",
        "07-26-2023"
        ],
        [
        "Jackson",
        "Westfield Mall",
        "Tue",
        "07-25-2023"
        ],
        [
        "No Guards Available",
        "The Grove",
        "Mon",
        "07-24-2023"
        ]
      ]
    );
  });
});