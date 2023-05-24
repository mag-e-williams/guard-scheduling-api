/*
- Guard: Represents one of the guards employed by the firm. Has properties:
    - Name: The name of the guard
    - Has armed guard credential: If the guard is licensed to carry a firearm on site.
    - Example:
        - { Name: "Jackson", Has armed guard: False}
*/

export type Guard  ={
    name: string;
    hasArmedGuardCredential: boolean;
}

export type GuardV2  ={
    id: string;
    fName: string;
    mName?: string;
    lName: string;
    hasArmedGuardCredential: boolean;
}