import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inputValues: {
        name: "",
        email: "",
        password: "",
    },
    user: "init",
    hasAccount: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInputValues: (state, { payload }) => {
            state.inputValues = payload;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        toggleHasAccount: (state) => {
            state.hasAccount = !state.hasAccount;
        },
        signin: () => { },
        signup: () => { },
    },
});

export const {
    setInputValues,
    setUser,
    toggleHasAccount,
    signin,
    signup,
} = authSlice.actions;

export const selectInputValues = (state) => state.auth.inputValues;
export const selectUser = (state) => state.auth.user;
export const selectHasAccount = (state) => state.auth.hasAccount

export default authSlice.reducer;