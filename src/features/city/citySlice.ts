import { ListResponse } from './../../models/common';
import { City } from './../../models/city';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CityState {
    loading: boolean;
    cityList: City[];

}

const initialState: CityState = {
    loading: false,
    cityList: [],

}

const citySlice = createSlice({
    name: 'city',
    initialState: initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.cityList = action.payload.data
        },
        fetchFailed(state, action) {
            state.loading = false
        }

    }
})

export const cityAction = citySlice.actions
const cityReducer = citySlice.reducer
export default cityReducer