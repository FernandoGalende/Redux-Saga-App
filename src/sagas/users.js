import {takeEvery, takeLatest, take, call, put, fork} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers(){
	try{
    const { data } = yield call(api.getUsers)
    console.log('data: ', data)
    yield put(actions.getUsersSuccess({
      items: data.data
    }))
	}catch(e){
    console.error('error: ', e)
	}
}

function* watchGetUsersRequest(){
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

const usersSagas = [
  fork(watchGetUsersRequest)
];

export default usersSagas;