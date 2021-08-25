import { City } from './../models/city';
import { ListResponse } from './../models/common';
import axios from './axiosClient'

const cityApi={
    getAll():Promise<ListResponse<City>>{
        const url = '/cities';
        return axios.get(url,{
            params:{
                _page:1,
                _limit:10,
            }
        });
    }
}

export default cityApi;