import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
            // state.movementOne = action.payload.movementOne;
            // state.movementTwo = action.payload.movementTwo;
            // state.movementThree = action.payload.movementThree;
            // state.movementFour = action.payload.movementFour;
            // state.movementFive = action.payload.movementFive;
        }
    }
});

export const { updateWodDetails } = wodSlice.actions;
export default wodSlice.reducer;
