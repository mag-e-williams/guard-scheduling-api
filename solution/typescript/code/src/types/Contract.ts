/*
- Contract: Represents the recurring shift details for a given contract. Has properties:
    - Contract name: id of contract
    - Days of the week: Which days each week the shift takes place. (Monday, Tuesday, Wednesday, etc.)
    - Requires armed guard credentials: If the shift required the guard to have an armed guard or not. (If required only licensed armed guards can fill this shift)
    - Length and time of shift: For simplicity, all shifts are 10 hours long and occur between 8am and 6pm.
    - Each shift is filled by one guard.
    - Each contract runs indefinitely.
    - Example:
        - { Contract name: "Sally's Mall", Days of the week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], Requires armed guard: False}
*/


type DaysOfWeek = {
    day: 'Mon' | 'Tues' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
}

export type Contract = {
    name: string,
    daysOfWeek: DaysOfWeek[],
    requiresArmedGuard?: boolean,

}