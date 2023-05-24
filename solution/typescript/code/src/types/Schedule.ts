/*
- Schedule: 
    - Represented as a list of ( Date - Contract name - Guard name) tuples.
    - When scheduling guards to shifts, we want to:
        - Ensure all shifts are filled.
        - Minimize overtime
            - Any hours worked over 40 hours in a given contiguous 7 day period are counted as overtime hours.
            - Making sure all shifts are filled is more important than minimizing overtime.
        - All licensing requirements are respected.
        - Return an error message for shifts which are unable to be filled given the limitation of available guards.    
    - Example:
        - [(05-01-2022, "Sally's Mall", "Jackson"), (05-02-2022, "Sally's Mall", "Sarah"), (05-03-2022, "Sally's Mall", "Jackson")]
*/

export type Schedule = [string, string, string][]; // Tuple representing (Date, ContractName, GuardName)

