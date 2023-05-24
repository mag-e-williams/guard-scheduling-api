/*
-   Implement REST endpoints for the `/schedule` resource.
    - Allows only GET operations. ✅︎
    - Takes two parameters, a start date and end date, to define the range to return the schedule for. ✅︎
    - Returns a representation of all of the shifts that fall within the date range with the name of guard assigned to it ✅︎
    - - (or error message if unable to find a guard). ✅︎
    - Document how this scheduling algorithm works. 
*/

import express, { Request, Response } from "express";
import moment from "moment";
import { sortBy } from "../helpers/sortBy"

import type { Contract, } from "../types/Contract";
import type { Guard } from "../types/Guard";
import type { PTO } from "../types/PTO";
import type { Shift } from "../types/Shift";
import type { Schedule } from "../types/Schedule";

import { contracts } from '../sampleData/Contracts';
import { guards } from '../sampleData/Guards';
import { PTOSchedule as pto } from '../sampleData/PTOSchedule';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const schedulesRouter = express.Router();

///////
// BEGINNING OF SCHEDULING LOGIC
///////

//// Generate List of Shifts (unscheduled)
const generateShifts = (startDate: string, endDate: string, contracts: Contract[]): Shift[] => {
  const shifts: Shift[] = [];
  contracts.forEach(contract => {
    const { name, daysOfWeek, requiresArmedGuard } = contract;
    let currentDateObj = moment(startDate);
    let endDateObj = moment(endDate);
    while (currentDateObj <= endDateObj) {
      const currentDayOfWeek = DAYS_OF_WEEK[currentDateObj.day()];
  
      if (daysOfWeek.includes(currentDayOfWeek)) {
        const shift: Shift = {
          name,
          day: currentDayOfWeek,
          date: currentDateObj.format('MM-DD-YYYY'),
          requiresArmedGuard,
        };
        shifts.push(shift);
      }

      currentDateObj = currentDateObj.add(1, 'days');
    }
  })
  return  sortBy(shifts, { field: "date", reverse: true });
};

function hasPTORequest(pto: PTO[], guardName: string, date: string): boolean {
  return pto.some((p) =>  p.name === guardName && p.date === date);
}

//// Schedule the list of Shifts generated in prev. function
type ScheduleShiftsProps = {
  contracts: Contract[];
  guards: Guard[];
  pto: PTO[];
  startDate: string,
  endDate: string,
};

const ScheduleShifts = ({contracts, guards, pto, startDate, endDate}: ScheduleShiftsProps): Schedule => {
  const activeContracts =  contracts.filter(c =>  moment(c.startDate) <= moment(startDate))  // only generate schedules for active contracts (based on contract start date)
  
  const shifts = generateShifts(startDate, endDate, activeContracts)
  const assignedGuards: { [date: string]: Guard[] } = {};
  const scheduledShifts: any[] = [];

  shifts.forEach((shift) => {
    const shiftDate = shift.date;

    // filter guards who are on PTO for shift date 
    const availableGuards = guards.filter((guard) => !hasPTORequest(pto, guard.name, shiftDate));

    // filter guards who are already scheduled for shift date 
    const guardsWithoutShiftOnSameDate = availableGuards.filter((guard) => {
        const guardsAssignedOnDay = assignedGuards[shiftDate]
        if (!guardsAssignedOnDay) return true;
        return !guardsAssignedOnDay.find((assignedGuard) => assignedGuard.name === guard.name)
      }
    );

    // filter guards based on required armed credential
    const filteredGuards = guardsWithoutShiftOnSameDate.filter(
      (guard) => guard.hasArmedGuardCredential === shift.requiresArmedGuard
    );

    if (filteredGuards && filteredGuards.length) {
      // get first guard and add it to the scheduledShifts list
      // TODO: room for improvement on which guard is scheduled and why
      const guard = filteredGuards[0]

      // add guard to schedule dict to avoid redundant scheduling
      if (assignedGuards.hasOwnProperty(shiftDate)) {
        assignedGuards[shiftDate].push(guard); 
      } else {
        assignedGuards[shiftDate] = [guard]; 
      }

      scheduledShifts.push([guard.name, shift.name, shift.day, shift.date])
    } else {
      scheduledShifts.push(['No Guards Available', shift.name, shift.day, shift.date])
    }
  });

  return scheduledShifts
}

///////
// BEGINNING OF REST API REQUESTS
///////

// GET all schedules within timeframe
schedulesRouter.get('/schedules/:startDate/:endDate', (req: Request, res: Response) => {
  // const { startDate, endDate } = req.params;

  const startDate = moment(req.params.startDate).format('MM-DD-YYYY')
  const endDate = moment(req.params.endDate).format('MM-DD-YYYY')

  const scheduledShifts = ScheduleShifts({contracts, guards, pto, startDate, endDate})

  if (scheduledShifts && scheduledShifts.length ) {
    res.json(scheduledShifts);
  } else {
    res.status(404).json({ message: 'No Schedules Found' });
  }
});

