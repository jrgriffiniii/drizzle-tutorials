import { generateStore, EventActions } from '@drizzle/store'
import drizzleOptions from '../drizzleOptions'

const contractEventNotifier = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      console.log(action);

      if (action.type === 'TX_BROADCASTED') {
        const txHash = action.txHash;
        console.log(txHash);
      }

      if (action.type === 'TX_SUCCESSFUL') {
        const txHash = action.txHash;
        console.log(txHash);
        console.log(store.getState());
      }
      return next(action);
    }
  }
}

/*
const reducers: any = {
  setTxHash: setTxHashReducer
}

const appReducers = [ reducers ]
*/
const appMiddlewares = [ contractEventNotifier ]

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})