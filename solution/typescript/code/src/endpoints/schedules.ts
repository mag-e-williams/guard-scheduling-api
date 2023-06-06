/*
-   Implement REST endpoints for the `/schedule` resource.
    - Allows only GET operations. ✅︎
    - Takes two parameters, a start date and end date, to define the range to return the schedule for. ✅︎
    - Returns a representation of all of the shifts that fall within the date range with the name of guard assigned to it ✅︎
    - - (or error message if unable to find a guard). ✅︎
    - Document how this scheduling algorithm works. 
*/

import express, { Request, Response } from 'express';
import moment from 'moment';
import { sortBy } from '../helpers/sortBy'

import type { Contract, } from '../types/Contract';
import type { Guard } from '../types/Guard';
import type { PTO } from '../types/PTO';
import type { Shift } from '../types/Shift';
import type { Schedule } from '../types/Schedule';

import { contractsData } from '../sampleData/contractsData';
import { guardsData } from '../sampleData/guardsData';
import { ptoScheduleData } from '../sampleData/ptoScheduleData';


const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const schedulesRouter = express.Router();

///////
// BEGINNING OF SCHEDULING LOGIC
///////

//// Generate List of Shifts (unscheduled)
export const generateShifts = (startDate: string, endDate: string, contracts: Contract[]): Shift[] => {
  const activeContracts =  contracts.filter(c =>  moment(c.startDate) <= moment(startDate))  // only generate schedules for active contracts (based on contract start date)

  const shifts: Shift[] = [];
  activeContracts.forEach(contract => {
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

function filterGuardsByPTO(guards: Guard[], ptoScheduleData: PTO[], date: string): Guard[] {
  return guards.filter(
    (guard) => !ptoScheduleData.find((pto) => pto.name === guard.name && pto.date === date)
  );
}

//// Schedule the list of Shifts generated in prev. function
type ScheduleShiftsProps = {
  contractsData: Contract[];
  guardsData: Guard[];
  ptoScheduleData: PTO[];
  startDate: string,
  endDate: string,
};

export const ScheduleShifts = ({contractsData, guardsData, ptoScheduleData, startDate, endDate}: ScheduleShiftsProps): Schedule => {
  const shifts = generateShifts(startDate, endDate, contractsData)
  const assignedGuards: { [date: string]: Guard[] } = {};
  const scheduledShifts: any[] = [];
  const shiftHours: number = 8;

  shifts.forEach((shift) => {
    const shiftDate = shift.date;

    const availableGuards = filterGuardsByPTO(guardsData, ptoScheduleData, shiftDate);

    // filter guards who are already scheduled for shift date 
    const guardsWithoutShiftOnSameDate = availableGuards.filter((guard) => {
        const guardsAssignedOnDay = assignedGuards[shiftDate]
        if (!guardsAssignedOnDay) return true;
        return !guardsAssignedOnDay.find((assignedGuard) => assignedGuard.name === guard.name)
      }
    );

    // filter guards based on required armed credential
    const guardsWithProperCredentials = guardsWithoutShiftOnSameDate.filter((guard) => {
        if (!shift.requiresArmedGuard) return true;
        else return guard.hasArmedGuardCredential;
      }
    );

    let assignedGuardsThatWeek: Guard[] = [];
    guardsWithProperCredentials.forEach((guard) => {
        const weekStart = moment(shiftDate).startOf('week');
        const weekEnd = moment(shiftDate).endOf('week');
        for (let current = moment(weekStart, 'MM-DD-YYYY'); current <= moment(weekEnd, 'MM-DD-YYYY'); current.add(1, 'day')) {
          const formattedDate = current.format('MM-DD-YYYY');
          if (assignedGuards[formattedDate]) {
            assignedGuardsThatWeek = assignedGuardsThatWeek.concat(assignedGuards[formattedDate]);
          }
        }      
      }
    );

    let assignedGuardHoursThatWeek: { [guardName: string]: number } = {};
    assignedGuardsThatWeek.forEach((guard) => {
      const guardName = guard.name
      if (assignedGuardHoursThatWeek.hasOwnProperty(guardName)) {
        assignedGuardHoursThatWeek[guardName] = assignedGuardHoursThatWeek[guardName] + shiftHours
      } else {
        assignedGuardHoursThatWeek[guardName] = shiftHours
      }
    });

    const filteredGuards = guardsWithProperCredentials.filter((guard) => {
      if (!assignedGuardHoursThatWeek.hasOwnProperty(guard.name)) return true
      return (assignedGuardHoursThatWeek[guard.name] + shiftHours <= 40)
    })

    if (filteredGuards && filteredGuards.length) {
      // get first guard and add it to the scheduledShifts list
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
  const startDate = moment(req.params.startDate).format('MM-DD-YYYY')
  const endDate = moment(req.params.endDate).format('MM-DD-YYYY')

  const scheduledShifts = ScheduleShifts({contractsData, guardsData, ptoScheduleData, startDate, endDate})

  if (scheduledShifts && scheduledShifts.length ) {
    res.json({data: scheduledShifts});
  } else {
    res.status(404).json({ message: 'No Schedules Found' });
  }
});

