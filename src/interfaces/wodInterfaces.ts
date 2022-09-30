import { MovementOptions } from './dataInterfaces';

export interface MovementRepObject {
    movementOne: number | null;
    movementTwo: number | null;
    movementThree: number | null;
    movementFour: number | null;
    movementFive: number | null;
}

export interface WodDetails {
    movementOne: {
        type: MovementOptions | null,
        reps: number
    },
    movementTwo: {
        type: MovementOptions | null,
        reps: number
    },
    movementThree: {
        type: MovementOptions | null,
        reps: number
    },
    movementFour: {
        type: MovementOptions | null,
        reps: number
    },
    movementFive: {
        type: MovementOptions | null,
        reps: number
    },
}
