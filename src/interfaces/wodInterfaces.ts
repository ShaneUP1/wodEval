import { PriorityType } from '../helpers/enums';
import { MovementOptions } from './dataInterfaces';

export interface MovementRepObject {
    movementOne: number;
    movementTwo: number;
    movementThree: number;
    movementFour: number;
    movementFive: number;
}

export interface WodDetails {
    priority: PriorityType | null,
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
