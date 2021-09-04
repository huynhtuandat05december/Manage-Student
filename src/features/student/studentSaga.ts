import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse } from './../../models/common';
import studentApi from 'api/studentApi';
import { studentAction } from './studentSlice';
import { takeLatest } from 'redux-saga/effects';
import { call, debounce, put } from '@redux-saga/core/effects';
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
function* searchWithDebounce(action: PayloadAction<ListParams>) {

    yield put(studentAction.setFilter(action.payload))

}

export default function* studentSaga() {
    yield takeLatest(studentAction.fetchData.type, fetchDataStudent)
    yield debounce(500, studentAction.setFilterWithDebounce.type, searchWithDebounce)
}