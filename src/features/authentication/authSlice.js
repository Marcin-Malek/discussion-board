import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    user: "init",
    hasAccount: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setNameInput: (state, { payload }) => {
            state.nameInput = payload;
        },
        setEmailInput: (state, { payload }) => {
            state.emailInput = payload;
        },
        setPasswordInput: (state, { payload }) => {
            state.passwordInput = payload;
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
    setNameInput,
    setEmailInput,
    setPasswordInput,
    setUser,
    toggleHasAccount,
    signin,
    signup,
} = authSlice.actions;

export const selectNameInput = (state) => state.auth.nameInput;
export const selectEmailInput = (state) => state.auth.emailInput;
export const selectPasswordInput = (state) => state.auth.passwordInput;
export const selectUser = (state) => state.auth.user;
export const selectHasAccount = (state) => state.auth.hasAccount

export default authSlice.reducer;