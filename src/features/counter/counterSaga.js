import { takeLatest, select, takeEvery, put } from "redux-saga/effects";
import { setCount, selectCount } from "./counterSlice";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseSetup";
import { selectUser } from "../authentication/authSlice";

function* counterInteractionHandler() {
    const user = yield select(selectUser);
    const count = yield select(selectCount);
    try {
        if (user) {
            const countReference = yield doc(database, user.uid, "count");
            yield setDoc(countReference, { count });

        } else {
            throw new Error("Couldn't identify user");
        }
    } catch (error) {
        console.log('Error in saga!:', error)
    }
}

function* fetchCountHandler() {
    const user = yield select(selectUser);
    try {
        if (user) {
            const countReference = yield doc(database, user.uid, "count");
            const countSnapshot = yield getDoc(countReference);

            if (countSnapshot.exists()) {
                yield put(setCount(countSnapshot.data().count));
            } else {
                yield put(setCount(0));
            }
        } else {
            throw new Error("Couldn't identify user");
        }
    } catch (error) {
        console.log('Error in saga!:', error)
    }
}

export function* counterSaga() {
    yield takeLatest(["counter/increment", "counter/decrement", "counter/incrementByAmount"], counterInteractionHandler);
    yield takeEvery("counter/fetchCount", fetchCountHandler);
}