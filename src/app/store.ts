import { configureStore } from '@reduxjs/toolkit';
import wodReducer from '../features/wod/wodSlice';

export const store = configureStore({
    reducer: {
        wod: wodReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
