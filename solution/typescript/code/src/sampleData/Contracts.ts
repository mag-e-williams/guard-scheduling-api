import { Contract } from '../types/Contract';

// Sample contracts data
export const contracts: Contract[] = [
    {
      name: "Sally's Mall",
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      requiresArmedGuard: false,
      startDate: new Date('05-22-2023'),
    },
    {
      name: "WTC",
      daysOfWeek: ["Mon", "Wed", "Fri", "Sun"],
      requiresArmedGuard: true,
      startDate: new Date('03-22-2023'),
    },
    {
      name: "Westfield Mall",
      daysOfWeek: ["Tue", "Wed", "Sat"],
      requiresArmedGuard: false,
      startDate: new Date('01-17-2023'),
    },
];