import { Contract } from "@exmpl/types/Contract";
import { Guard } from "@exmpl/types/Guard";
import { PTO } from "@exmpl/types/PTO";
import { Shift } from "@exmpl/types/Shift";

export const startDate_1 = '07-23-2023'
export const endDate_1 = '07-30-2023'

export const contracts_1: Contract[] = [
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

export const shifts_1: Shift[] = [
  {
    name: 'The Grove',
    day: 'Sat',
    date: '07-29-2023',
    requiresArmedGuard: true
  },
  {
    name: 'Westfield Mall',
    day: 'Sat',
    date: '07-29-2023',
    requiresArmedGuard: false
  },
  {
    name: 'Westfield Mall',
    day: 'Wed',
    date: '07-26-2023',
    requiresArmedGuard: false
  },
  {
    name: 'Westfield Mall',
    day: 'Tue',
    date: '07-25-2023',
    requiresArmedGuard: false
  },
  {
    name: 'The Grove',
    day: 'Mon',
    date: '07-24-2023',
    requiresArmedGuard: true
  }
]

export const pto_1: PTO[] = [
  { name: 'Jackson', date: '07-24-2023' },
  { name: 'Jackson', date: '07-29-2023' },
  { name: 'Smith', date: '07-24-2023' },
];

export const guards_1: Guard[] = [
  { name: 'Jackson', hasArmedGuardCredential: false },
  { name: 'Smith', hasArmedGuardCredential: true },
];