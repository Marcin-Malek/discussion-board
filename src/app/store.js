import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootSaga from './rootSaga';
import counterReducer from '../features/counter/counterSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);