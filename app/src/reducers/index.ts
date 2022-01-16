import { drizzleReducers } from '@drizzle/store';
import { put, takeEvery } from 'redux-saga/effects';
import { combineReducers } from 'redux';

// actions

// reducers
const accountReducer = (state: any = {}, action: any) => {
  let updated: any;

  switch (action.type) {
    case 'ACCOUNT_CONNECTED':
      updated = Object.assign({}, state, {
        account: action.accounts[0],
      });
      break;
    default:
      updated = Object.assign({}, state);
      break;
  }

  return updated;
};

const contractsReducer = (state: any = {}, action: any) => {
  let updated: any;

  //console.log(state);
  //console.log(action);

  switch (action.type) {
    case 'CORN_CONTRACT_READY':
      updated = Object.assign({}, state, {
        CornContract: action.contract,
      });
      break;
    default:
      updated = Object.assign({}, state);
      break;
  }

  return updated;
};

/*
// fetch data from service using sagas
function *fetchTodos() {
  const todos: any = yield fetch('https://jsonplaceholder.typicode.com/todos').then(resp => response.json())
  yield put({ type: TODOS_RECEIVED, todos })
}
*/

// Combine all your redux concerns

/*
// app root saga
function *appRootSaga() {
  yield takeEvery(TODOS_FETCH, fetchTodos)
}
*/

const rootReducer: any = combineReducers({
  account: accountReducer,
  contracts: contractsReducer,
});

const reducers: any = {
  myMarketApp: rootReducer,
};

export default reducers;
