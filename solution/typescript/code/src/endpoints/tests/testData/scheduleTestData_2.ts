import { Contract } from "@exmpl/types/Contract";
import { Guard } from "@exmpl/types/Guard";
import { PTO } from "@exmpl/types/PTO";
import { Shift } from "@exmpl/types/Shift";

export const startDate_2 = '02-22-2023'
export const endDate_2 = '02-30-2023'

// Make sure shifts are only generated for active contracts
export const contracts_2: Contract[] = [
  {
    name: "Westfield Mall",
    daysOfWeek: ["Tue", "Wed", "Sat"],
    requiresArmedGuard: false,
    startDate: '01-17-2023',
  },
  {
    name: "The Grove",
    daysOfWeek: ["Mon", "Sat"],
    requiresArmedGuard: true,
    startDate: '04-17-2023',
  },
];

export const shifts_2: Shift[] = [
  {
    name: 'Westfield Mall',
    day: 'Wed',
    date: '03-01-2023',
    requiresArmedGuard: false
  },
  {
    name: 'Westfield Mall',
    day: 'Tue',
    date: '02-28-2023',
    requiresArmedGuard: false
  },
  {
    name: 'Westfield Mall',
    day: 'Sat',
    date: '02-25-2023',
    requiresArmedGuard: false
  },
  {
    name: 'Westfield Mall',
    day: 'Wed',
    date: '02-22-2023',
    requiresArmedGuard: false
  }
]

export const pto_2: PTO[] = [
  { name: 'Jackson', date: '05-02-2023' },
  { name: 'Smith', date: '05-24-2023' },
  { name: 'Jackson', date: '05-29-2023' },
  { name: 'Jackson', date: '05-24-2023' },
  { name: 'Jackson', date: '05-27-2023' },
  { name: 'Jackson', date: '05-30-2023' },
  { name: 'Smith', date: '05-29-2023' },
  { name: 'Smith', date: '05-30-2023' },
  { name: 'Jen', date: '05-30-2023' },
];

export const guards_2: Guard[] = [
  { name: 'Jackson', hasArmedGuardCredential: false },
  { name: 'Smith', hasArmedGuardCredential: false },
  { name: 'Jen', hasArmedGuardCredential: false },
  { name: 'Alex', hasArmedGuardCredential: false },
  { name: 'Lucy', hasArmedGuardCredential: false },
];