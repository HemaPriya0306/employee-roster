import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { data: [] },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using redux-saga
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
