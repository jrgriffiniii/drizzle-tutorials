import { generateStore, EventActions } from '@drizzle/store';
import drizzleOptions from '../drizzleOptions';
import reducers from '../reducers';
import { put, takeEvery } from 'redux-saga/effects';
import { SwitchVideo } from '@material-ui/icons';

const contractEventNotifier = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      const state: any = store.getState();

      //console.log(action);
      //console.log(state);

      if (action.type === 'ACCOUNT_BALANCES_FETCHED') {
        store.dispatch({ type: 'ACCOUNT_CONNECTED', accounts: state.accounts });
      }

      if (action.type === 'CONTRACT_INITIALIZED') {
        if (action.name == 'CornContract') {
          store.dispatch({
            type: 'CORN_CONTRACT_READY',
            contract: state.contracts['CornContract'],
          });
        }
      }

      if (action.type === 'TX_BROADCASTED') {
        const txHash = action.txHash;
        //console.log(txHash);
      }

      if (action.type === 'TX_SUCCESSFUL') {
        const txHash = action.txHash;
        //console.log(txHash);
      }

      return next(action);
    };
  };
};

/*
function *setAccount() {
  yield put({ type: 'ACCOUNT_SET', foo: 'bar' })
}

function *appRootSaga() {
  yield takeEvery('ACCOUNT_SET', setAccount);
}
*/

const appReducers = reducers;
//const appSagas = [appRootSaga];
const appMiddlewares = [contractEventNotifier];

export default generateStore({
  drizzleOptions,
  appReducers,
  appMiddlewares,
  disableReduxDevTools: false, // enable ReduxDevTools!
});
