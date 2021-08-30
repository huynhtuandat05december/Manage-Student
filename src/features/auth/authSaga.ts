import { LoginPayload, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import {push} from 'connected-react-router'


function* handleLogin(payload:LoginPayload){
    try {
        yield delay(1000)
        localStorage.setItem('access_token','fake__token')
        yield put(authActions.loginSuccess(payload))
        yield put(push('/admin'))
    } catch (error) {
        yield put(authActions.loginFailed)
        
    }

}
function* handleLogout(){
    localStorage.removeItem('access_token')
    yield put(push('/login'))

}
function* watchLoginFlow(){
    while(true){
        const isLoggedIn=Boolean(localStorage.getItem('access_token'));
        if(!isLoggedIn){
            const action:PayloadAction<LoginPayload>= yield take(authActions.login.type)
            yield fork(handleLogin,action.payload)
        }
        yield take(authActions.logout.type)
        yield call(handleLogout)
    }
}


export default function* authSaga(){
    yield fork(watchLoginFlow)
}