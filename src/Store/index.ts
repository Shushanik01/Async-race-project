import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garageSlice.ts';
import winnersReducer from './winnersSlice.ts';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;