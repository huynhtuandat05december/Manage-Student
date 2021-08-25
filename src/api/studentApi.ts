import { ListParams, ListResponse } from './../models/common';
import { Student } from './../models/student';
import axios from './axiosClient'

const studentApi={
    getAll(params:ListParams):Promise<ListResponse<Student>>{
        const url = '/students';
        return axios.get(url,{
            params
        });
    },
    getById(id: string) :Promise<Student>{
        const url = `/students/${id}`;
        return axios.get(url);
    },
    
    add(data: Student):Promise<Student>{
        const url = '/students';
        return axios.post(url, data);
    },
    
    update(data:Student):Promise<Student>{
        const url = `/students/${data.id}`;
        return axios.patch(url, data);
    },
    
    remove(id: string) :Promise<any>{
        const url = `/students/${id}`;
        return axios.delete(url);
    },
}
export default studentApi;