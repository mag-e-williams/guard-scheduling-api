# Documentation for Guard Scheduling Coding Assignment

### Design Decisions: Data Types

- types located in `/src/types/:type`
- for simplicity sake, all dates are stored as strings in `MM-DD-YYYY` format

### Guard `/src/types/Guard`

| field                   | dataType | notes                        |
| ----------------------- | -------- | ---------------------------- |
| name                    | string   | name of the guard (PK)       |
| hasArmedGuardCredential | boolean  | licensed to carry a firearm? |

### Contract `/src/types/Contract`Wednesday, 5/31

| field              | dataType | notes                                                                                                             |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| name               | string   | name of the contract (PK)                                                                                         |
| daysOfWeek         | string[] | list of the days contract is scheduled for in EEE format - ['Mon','Tue','Wed',...]                                |
| requiresArmedGuard | boolean  |
| startDate          | string   | `MM-DD-YYYY` probably not necessary, but used to make sure shifts are only generated for when the contract active |

### PTO `/src/types/PTO`

| field | dataType | notes             |
| ----- | -------- | ----------------- |
| name  | string   | name of the guard |
| date  | string   | `MM-DD-YYYY`      |

### Schedule `/src/types/Schedule`

| field                                        | dataType                           | notes                                                                         |
| -------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| [guardName, contractName, dayOfWeek, date][] | [string, string, string, string][] | guardname will be `No Guards Available` if the algo is unable to schedule one |

#### Shift `/src/types/Shift`

| field              | dataType | notes                               |
| ------------------ | -------- | ----------------------------------- |
| name               | string   | name of the contract for the shift  |
| day                | string   | dayOfWeek (ex. 'Mon', 'Wed', 'Fri') |
| requiresArmedGuard | boolean  | `MM-DD-YYYY`                        |
| date               | string   | `MM-DD-YYYY` shift date             |

## Scheduling Logic

Majority of logic is located in `ScheduleShifts()` within `/src/endpoints/schedules` which takes in the following as input: - contractsData: Contract[]; - guardsData: Guard[]; - ptoScheduleData: PTO[]; - startDate: string, - endDate: string,

steps:

1. generateShifts() -- returns Shifts[]
   - filter only active contracts by `contract.startDate`
   - construct shifts by looping through dates from `startDate` to `endDate`, then generating a list of all shifts for that contract based on if the day of the week is included in the contracts scheduled daysOfWeek
     -add all shifts to the shift list
2. for each shift
   - find `availableGuards` by filtering out any guards that have PTO scheduled for that shift date.
   - find `guardsWithoutShiftOnSameDate` by filtering `availableGuards` by removing any guards who are already scheduled for a shift on the same day
   - finally, filter `guardsWithoutShiftOnSameDate` to remove any guard that does not have the required credential for the shift.
     assign the first (index[0]) guard to the shift if there is one available. assign an error instead of a guard if no guard is available.
3. return formatted list of assigned shifts as a schedule list

## Example Curls:

Guard:

curl -X POST -H "Content-Type: application/json" -d '{"name": "Roger", "hasArmedGuardCredential": "false"}' http://localhost:3000/guards

curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/guards/Roger

curl -X GET -H "Content-Type: application/json" http://localhost:3000/schedules/2023-05-28/2023-05-30
