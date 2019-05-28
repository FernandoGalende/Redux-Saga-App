import { takeEvery, takeLatest, take, call, put, fork } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers(){
	try{
    const { data } = yield call(api.getUsers)
    yield put(actions.getUsersSuccess({
      items: data.data
    }));
	}catch(e){
    yield put(actions.usersError({
      error: 'An error ocurred when trying to get users'
    }));
	}
}

function* watchGetUsersRequest(){
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action){
	try{
    yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName
    });
    yield call(getUsers);
	}catch(e){
    yield put(actions.usersError({
      error: 'An error ocurred when trying to create the user'
    }));
	}
}

function* watchCreateUserRequest(){
  while(true){
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
  }
}

function* deleteUser(userId){
	try{
    yield call(api.deleteUser, userId);
    yield call(getUsers)
	}catch(e){
    yield put(actions.usersError({
      error: 'An error ocurred when trying to delete the user'
    }))
	}
}

function* watchDeleteUserRequest(){
  const { payload } = 	yield take(actions.Types.DELETE_USER_REQUEST);
  yield call(deleteUser, payload.userId)
}

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest)
];

export default usersSagas;