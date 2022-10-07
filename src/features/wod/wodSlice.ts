import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriorityType } from '../../helpers/enums';
import { MovementOptions } from '../../interfaces/dataInterfaces';
import { WodDetails } from '../../interfaces/wodInterfaces';

interface WodState {
    [K: string]: WodDetails;
}

const wodSlice = createSlice({
    name: 'wod',
    initialState: {} as WodState,
    reducers: {
        updateWodDetails: (state, action: PayloadAction<WodDetails>) => {
            state[action.payload.id] = action.payload;
        },
        updatePriorityType: (state, action: PayloadAction<{ priority: PriorityType, id: number }>) => {
            state[action.payload.id].priority = action.payload.priority;
        },
        updateTime: (state, action: PayloadAction<{ time: number, id: number }>) => {
            state[action.payload.id].time = action.payload.time;
        },
        updateRounds: (state, action: PayloadAction<{ rounds: number, id: number }>) => {
            state[action.payload.id].rounds = action.payload.rounds;
        },
        updateMovementOne: (state, action: PayloadAction<{movement: MovementOptions | null, id: number}>) => {
            state[action.payload.id].movementOne.type = action.payload.movement;
        },
        updateMovementTwo: (state, action: PayloadAction<{movement: MovementOptions | null, id: number}>) => {
            state[action.payload.id].movementTwo.type = action.payload.movement;
        },
        updateMovementThree: (state, action: PayloadAction<{movement: MovementOptions | null, id: number}>) => {
            state[action.payload.id].movementThree.type = action.payload.movement;
        },
        updateMovementFour: (state, action: PayloadAction<{movement: MovementOptions | null, id: number}>) => {
            state[action.payload.id].movementFour.type = action.payload.movement;
        },
        updateMovementFive: (state, action: PayloadAction<{movement: MovementOptions | null, id: number}>) => {
            state[action.payload.id].movementFive.type = action.payload.movement;
        },
        updateMovementOneReps: (state, action: PayloadAction<{ reps: number, id: number }>) => {
            state[action.payload.id].movementOne.reps = action.payload.reps;
        },
        updateMovementTwoReps: (state, action: PayloadAction<{ reps: number, id: number }>) => {
            state[action.payload.id].movementTwo.reps = action.payload.reps;
        },
        updateMovementThreeReps: (state, action: PayloadAction<{ reps: number, id: number }>) => {
            state[action.payload.id].movementThree.reps = action.payload.reps;
        },
        updateMovementFourReps: (state, action: PayloadAction<{ reps: number, id: number }>) => {
            state[action.payload.id].movementFour.reps = action.payload.reps;
        },
        updateMovementFiveReps: (state, action: PayloadAction<{ reps: number, id: number }>) => {
            state[action.payload.id].movementFive.reps = action.payload.reps;
        }
    }
});

export const {
    updateWodDetails,
    updatePriorityType,
    updateTime,
    updateRounds,
    updateMovementOne,
    updateMovementTwo,
    updateMovementThree,
    updateMovementFour,
    updateMovementFive,
    updateMovementOneReps,
    updateMovementTwoReps,
    updateMovementThreeReps,
    updateMovementFourReps,
    updateMovementFiveReps
} = wodSlice.actions;
export default wodSlice.reducer;
