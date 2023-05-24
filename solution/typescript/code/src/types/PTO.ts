/*
- PTO:
    - Guards can request PTO off for a given date.
    - All PTO is approved.
    - Guards who have PTO for a given day can not be scheduled to work on that day.
    - Example:
        - { Name: "Jackson", Date: 05-02-2022}
*/

export type PTO  ={
    name: string;
    date: string;
}
