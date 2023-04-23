import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        nome: '',
        email: ''
    },
    reducers: {
        setId: (state, action) => {
            state._id = action.payload;
        },
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    }
})

export const { setId, setNome, setEmail } = slice.actions;
export default slice.reducer;