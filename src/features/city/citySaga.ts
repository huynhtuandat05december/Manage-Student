import { ListResponse } from './../../models/common';
import cityApi from 'api/cityApi';
import { City } from './../../models/city';
import { cityAction } from './citySlice';
import { takeLatest, put, call } from 'redux-saga/effects';


function* fetchDataCity() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll)
        yield put(cityAction.fetchDataSuccess(response))

    } catch (error) {
        console.log(error)
        yield put(cityAction.fetchFailed)

    }

}

export default function* citySaga() {
    yield takeLatest(cityAction.fetchData.type, fetchDataCity)
}