import { takeLatest, select, takeEvery, put } from "redux-saga/effects";
import { setCount, selectCount, } from "./counterSlice";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { database } from "../../firebaseSetup";

const countReference = doc(database, "count", "count");

function* counterInteractionHandler() {
    const count = yield select(selectCount);
    try {
        yield setDoc(countReference, { count });
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

function* fetchCountHandler() {
    try {
        const docSnap = yield getDoc(countReference);

        if (docSnap.exists()) {
            yield put(setCount(docSnap.data().count));
        } else {
            yield put(setCount(0));
        }

    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

export function* counterSaga() {
    yield takeLatest(["counter/increment", "counter/decrement", "counter/incrementByAmount"], counterInteractionHandler);
    yield takeEvery("counter/fetchCount", fetchCountHandler)
}