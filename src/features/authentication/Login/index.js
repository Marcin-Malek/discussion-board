import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setNameInput,
    setEmailInput,
    setPasswordInput,
    signin,
    signup,
    toggleHasAccount,
    selectNameInput,
    selectEmailInput,
    selectPasswordInput,
    selectHasAccount,
} from '../authSlice';

const Login = () => {
    const dispatch = useDispatch();

    const name = useSelector(selectNameInput);
    const email = useSelector(selectEmailInput);
    const password = useSelector(selectPasswordInput);
    const hasAccount = useSelector(selectHasAccount);

    return (
        (hasAccount && (
            <>
                <form>
                    <input
                        value={email}
                        onChange={(e) => dispatch(setEmailInput(e.target.value))}
                        placeholder='Email'
                        type='email'
                    />
                    <input
                        value={password}
                        onChange={(e) => dispatch(setPasswordInput(e.target.value))}
                        placeholder='Password'
                        type='password'
                    />
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(signin());
                        }}
                    >
                        Log In
                    </button>
                </form>

                <p>
                    Not a member?{" "}
                    <button onClick={() => dispatch(toggleHasAccount())}>
                        Register Now
                    </button>
                </p>
            </>
        )) || (
            <>
                <form>
                    <input
                        value={name}
                        onChange={(e) => dispatch(setNameInput(e.target.value))}
                        placeholder='Full name (required for registering)'
                        type='text'
                    />
                    <input
                        value={email}
                        onChange={(e) => dispatch(setEmailInput(e.target.value))}
                        placeholder='Email'
                        type='email'
                    />
                    <input
                        value={password}
                        onChange={(e) => dispatch(setPasswordInput(e.target.value))}
                        placeholder='Password'
                        type='password'
                    />
                    <button
                        type='submit'
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(signup());
                        }}
                    >
                        Sign Up
                    </button>
                </form>

                <p>
                    Already have an account?{' '}
                    <button onClick={() => dispatch(toggleHasAccount())}>
                        Log in
                    </button>
                </p>
            </>
        )
    );
};

export default Login;