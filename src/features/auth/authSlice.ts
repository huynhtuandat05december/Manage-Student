import { User } from './../../models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginPayload{
    user:string;
    password:string;
}

export interface AuthState{
    isLoggedIn:boolean;
    logging?:boolean;
    currentUser?:User

}

const initialState:AuthState={
    isLoggedIn:false,
    logging:false,
    currentUser:undefined
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        login(state,action:PayloadAction<LoginPayload>){
            state.logging=true;
        },
        loginSuccess(state,action){
            state.logging=false;
            state.isLoggedIn=true;
            state.currentUser=action.payload;
        },
        loginFailed(state,action){
            state.logging=false;
        },
        logout(state,action){
            state.isLoggedIn=false;
            state.currentUser=undefined;
        }
    }
    
})

export const authActions=authSlice.actions
const authReducers=authSlice.reducer
export default authReducers