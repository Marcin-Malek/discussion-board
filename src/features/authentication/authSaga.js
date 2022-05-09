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
    setInputValues,
    selectInputValues,
    setUser,
    signin,
    signup,
    toggleHasAccount
} from "./authSlice";

function* signInHandler() {
    const inputValues = yield select(selectInputValues);
    try {
        const userAuth = yield signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
        yield put(setUser({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
        }));
        yield put(setInputValues({
            name: "",
            email: "",
            password: ""
        }));
    } catch (error) {
        console.error(error);
        alert("Sorry, something went wrong, make sure your email and password is correct");
    }
}

function* signUpHandler() {
    const inputValues = yield select(selectInputValues);

    try {
        const userAuth = yield createUserWithEmailAndPassword(auth, inputValues.email, inputValues.password);
        try {
            yield call(updateProfile, userAuth.user, { displayName: inputValues.name })
            yield put(setUser({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
            }));
            yield put(toggleHasAccount());
            yield put(setInputValues({
                name: "",
                email: "",
                password: ""
            }));
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