import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { getEmployeesRequest, getEmployeesFulfilled, getEmployeesFailed } from '../slices/employeeInfoSlice';

function* getEmployees() {
  try {
    const response = yield call(axios.get, '/sample-data.json');
    console.log(response);
    yield put(getEmployeesFulfilled(response.data));
  } catch (error) {
    console.error(error);
    yield put(getEmployeesFailed(error.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(getEmployeesRequest.type, getEmployees)]);
}
