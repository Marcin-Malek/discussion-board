import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setInputValues,
    signin,
    signup,
    toggleHasAccount,
    selectInputValues,
    selectHasAccount,
} from '../authSlice';

const Login = () => {
    const dispatch = useDispatch();

    const name = useSelector(selectInputValues).name;
    const email = useSelector(selectInputValues).email;
    const password = useSelector(selectInputValues).password;
    const hasAccount = useSelector(selectHasAccount);

    return (
        (hasAccount && (
            <>
                <form>
                    <input
                        value={email}
                        onChange={(e) => dispatch(setInputValues({
                            name,
                            email: e.target.value,
                            password
                        }))}
                        placeholder='Email'
                        type='email'
                    />
                    <input
                        value={password}
                        onChange={(e) => dispatch(setInputValues({
                            name,
                            email,
                            password: e.target.value
                        }))}
                        placeholder='Password'
                        type='password'
                    />
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();

                            if (!email) {
                                alert("Please enter your email");
                            } else if (!password) {
                                alert("You need to create a password");
                            } else {
                                dispatch(signin());
                            }
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
                        onChange={(e) => dispatch(setInputValues({
                            name: e.target.value,
                            email,
                            password
                        }))}
                        placeholder='Full name (required for registering)'
                        type='text'
                    />
                    <input
                        value={email}
                        onChange={(e) => dispatch(setInputValues({
                            name,
                            email: e.target.value,
                            password
                        }))}
                        placeholder='Email'
                        type='email'
                    />
                    <input
                        value={password}
                        onChange={(e) => dispatch(setInputValues({
                            name,
                            email,
                            password: e.target.value
                        }))}
                        placeholder='Password'
                        type='password'
                    />
                    <button
                        type='submit'
                        onClick={(e) => {
                            e.preventDefault();

                            if (!name) {
                                alert("Please enter your name");
                            } else if (!email) {
                                alert("Please enter your email");
                            } else if (!password) {
                                alert("You need to create a password");
                            } else {
                                dispatch(signup());
                            }
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