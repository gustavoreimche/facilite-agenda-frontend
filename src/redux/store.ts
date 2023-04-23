import { configureStore } from '@reduxjs/toolkit' 
import authReducer from './reducers/authReducer' 
import nomeReducer from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: nomeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;