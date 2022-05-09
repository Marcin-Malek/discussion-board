import {
    takeEvery,
    put,
    call,
    select
} from "redux-saga/effects";
import { auth } from "../../firebaseSetup";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    setNameInput,
    setEmailInput,
    setPasswordInput,
    selectNameInput,
    selectEmailInput,
    selectPasswordInput,
    setUser,
    signin,
    signup,
    toggleHasAccount
} from "./authSlice";

function* signInHandler() {
    const email = yield select(selectEmailInput);
    const password = yield select(selectPasswordInput);
    try {
        const userAuth = yield signInWithEmailAndPassword(auth, email, password)
        yield put(setUser({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
        }));
        yield put(setNameInput(""));
        yield put(setEmailInput(""));
        yield put(setPasswordInput(""));
    } catch (error) {
        console.error(error);
        alert("Sorry, something went wrong, make sure your email and password is correct");
    }
}

function* signUpHandler() {
    const name = yield select(selectNameInput);
    const email = yield select(selectEmailInput);
    const password = yield select(selectPasswordInput);

    try {
        const userAuth = yield createUserWithEmailAndPassword(auth, email, password);
        try {
            yield call(updateProfile, userAuth.user, { displayName: name })
            yield put(setUser({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
            }));
            yield put(toggleHasAccount());
            yield put(setNameInput(""));
            yield put(setEmailInput(""));
            yield put(setPasswordInput(""));
        } catch (error) {
            yield console.log("User not updated");
        }
    } catch (error) {
        yield console.error(error);
        yield alert("Sorry, something went wrong");
    }
}

export function* authSaga() {
    yield takeEvery(signin.type, signInHandler);
    yield takeEvery(signup.type, signUpHandler);
}