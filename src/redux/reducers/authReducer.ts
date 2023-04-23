import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    }
})

export const { setAuth } = slice.actions;
export default slice.reducer;