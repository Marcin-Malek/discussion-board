import { all } from "redux-saga/effects";
import { authSaga } from "../features/authentication/authSaga";
import { counterSaga } from "../features/counter/counterSaga";

export default function* rootSaga() {
    yield all([
        counterSaga(),
        authSaga(),
    ])
}