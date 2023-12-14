import { PriorityType } from '../helpers/enums';
import { MovementOptions } from './dataInterfaces';

export type MovementRepObject = {
    movementOne: number;
    movementTwo: number;
    movementThree: number;
    movementFour: number;
    movementFive: number;
}

export type WodDetails = {
    id: number,
    priority: PriorityType | null,
    rounds: number,
    time: number,
    repMax: number,
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
