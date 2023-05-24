### Objective
 
One of the first modules we are going to build at Belfry is scheduling. Owners of security guard firms spend a significant amount of time ensuring all of their shifts are filled each week, and a dropped shift can mean the end of a valuable contract. Automating part of this process would be a major value add as part of our software!
 
The deliverable of this assignment is to implement a scheduling REST API using the language and framework of your choice ( flask may be the easiest setup for something this simple, but up to you to go with what you're most familiar with).
 
### Important Concepts:
 
- Guard: Represents one of the guards employed by the firm. Has properties:
    - Name: The name of the guard
    - Has armed guard credential: If the guard is licensed to carry a firearm on site.
    - Example:
        - { Name: "Jackson", Has armed guard: False}
 
- Contract: Represents the recurring shift details for a given contract. Has properties:
    - Contract name: id of contract
    - Days of the week: Which days each week the shift takes place. (Monday, Tuesday, Wednesday, etc.)
    - Requires armed guard credentials: If the shift required the guard to have an armed guard or not. (If required only licensed armed guards can fill this shift)
    - Length and time of shift: For simplicity, all shifts are 10 hours long and occur between 8am and 6pm.
    - Each shift is filled by one guard.
    - Each contract runs indefinitely.
    - Example:
        - { Contract name: "Sally's Mall", Days of the week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], Requires armed guard: False}
 
- PTO:
    - Guards can request PTO off for a given date.
    - All PTO is approved.
    - Guards who have PTO for a given day can not be scheduled to work on that day.
    - Example:
        - { Name: "Jackson", Date: 05-02-2022}

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
 
### Tasks
 
-   Implement a REST API returning JSON.
-   Implement a custom contract model with fields corresponding to the above definition.
    - Implement endpoints to create and delete contracts.
    - Contracts begin on the day they are created.
    - Choose the data type for each field that makes the most sense.
-   Implement a custom guard model with fields corresponding to the above definition.
    - Implement endpoints to create and delete guards.
    - Choose the data type for each field that makes the most sense.
-   Implement REST endpoints for the `/schedule` resource.
    - Allows only GET operations.
    - Takes two parameters, a start date and end date, to define the range to return the schedule for.
    - Returns a representation of all of the shifts that fall within the date range with the name of guard assigned to it (or error message if unable to find a guard).
    - Document how this scheduling algorithm works.
-   Implement REST endpoints for the `/pto` resource
    - Allows only PUT operations.
    - Takes two parameters, a guard name and date to request off (guards can only request off one day at a time).
-   Implement tests for the `/schedule` endpoint.
 
### Evaluation Criteria
 
-   Best practices for the language you have chosen.
-   If you are using a framework make sure best practices are followed for models, configuration and tests.
-   Write tests for the `/schedule` endpoints.
-   We are looking for a reasonable scheduling algorithm based on the above definition, don't worry if it's not necessarily the "optimal" solution.
-   Please dont feel the need to invest too much time in the create/delete endpoints. The goal of this project isn't to be tedious!
 
### Starter Code

I've added some starter code for running a web server using Python - Flask or Typescript - express. You are free to use, modify, or ignore this code as much as you want. No pressure to use these frameworks or languages if you prefer an alternative.

### Notes
 
- Cyber security and authentication is incredibly important for an application managing physical security assets! But for the sake of this assignment don't worry about it.
- Normally we would be persisting the data structures and models to permanent storage, but for the sake of limiting the scope of this project we can persist them to an in-memory structure. (unless you prefer to implement it as something that writes to a db such as django's ORM, sqlalchemy, etc.)
- Please feel free to consult any external resources.
- Please make assumptions around any behavior not explicitly defined, but document said assumptions for later discussion.
- If at any point you have a question about the project, please feel free to email me at: alex@belfrysoftware.com or text me at: 919-830-9521
- We'll plan to review your solution together and talk about why you made the decisions you went with as well as how we could potentially build out your solution with more functionality.
 
### CodeSubmit
 
Please push your changes to the master branch when you are happy with it.
After you have pushed your code, you may submit the assignment on the assignment page.
 
All the best and happy coding,
 
The Belfry Team

