import { configureStore } from '@reduxjs/toolkit';
import graphReducer from './graphSlice';

const store = configureStore({
    reducer: {
        graph: graphReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






