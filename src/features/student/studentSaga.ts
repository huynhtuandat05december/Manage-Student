import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse } from './../../models/common';
import studentApi from 'api/studentApi';
import { studentAction } from './studentSlice';
import { takeLatest } from 'redux-saga/effects';
import { call, put } from '@redux-saga/core/effects';
import { Student } from 'models';


function* fetchDataStudent(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload)
        yield put(studentAction.fetchDataSuccess(response))
    } catch (error) {
        console.log(error)
        yield put(studentAction.fetchDataFailed)

    }


}

export default function* studentSaga() {
    yield takeLatest(studentAction.fetchData.type, fetchDataStudent)
}