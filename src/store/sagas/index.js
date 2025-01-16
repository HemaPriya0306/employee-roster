import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getEmployeesRequest, getEmployeesFulfilled, getEmployeesFailed } from '../slices/employeeInfoSlice';

function* getEmployees() {
  try {
    // throw new Error('Simulated error: Unable to fetch employees');
    const response = yield call(axios.get, `${process.env.PUBLIC_URL}/sample-data.json`);
    yield put(getEmployeesFulfilled(response.data));
  } catch (error) {
    console.error(error);
    yield put(getEmployeesFailed(error.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(getEmployeesRequest.type, getEmployees)]);
}
