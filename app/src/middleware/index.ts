import { generateStore, EventActions } from '@drizzle/store';
import drizzleOptions from '../drizzleOptions';

const contractEventNotifier = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      console.log(action);
      console.log(store.getState());

      if (action.type === 'TX_BROADCASTED') {
        const txHash = action.txHash;
        console.log(txHash);
      }

      if (action.type === 'TX_SUCCESSFUL') {
        const txHash = action.txHash;
        console.log(txHash);
      }

      return next(action);
    };
  };
};

const reducers: any = {
}

const appReducers = [reducers]
const appMiddlewares = [contractEventNotifier];

export default generateStore({
  drizzleOptions,
  appMiddlewares,
  appReducers,
  disableReduxDevTools: false, // enable ReduxDevTools!
});
