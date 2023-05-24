import { Contract } from '../types/Contract';

export const contracts: Contract[] = [
    {
      name: "Sally's Mall",
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      requiresArmedGuard: false,
      startDate: '05-22-2023',
    },
    {
      name: "WTC",
      daysOfWeek: ["Mon", "Wed", "Fri", "Sun"],
      requiresArmedGuard: true,
      startDate: '03-22-2023',
    },
    {
      name: "Westfield Mall",
      daysOfWeek: ["Tue", "Wed", "Sat"],
      requiresArmedGuard: false,
      startDate: '01-17-2023',
    },
    {
      name: "The Grove",
      daysOfWeek: ["Mon", "Tue", "Wed", "Sat"],
      requiresArmedGuard: true,
      startDate: '04-17-2023',
    },
];