import {combineReducers} from 'redux';

import horsesReducer from 'awesomeproject/src/slices/horses/horsesSlice';
import historyReducer from 'awesomeproject/src/slices/history/historySlice';
import walletReducer from 'awesomeproject/src/slices/wallet/walletSlice';
import {exchangeApi} from 'awesomeproject/src/services/rtkFetchRate';

const rootReducer = combineReducers({
  wallet: walletReducer,
  horses: horsesReducer,
  history: historyReducer,
  // Add the generated reducer as a specific top-level slice
  [exchangeApi.reducerPath]: exchangeApi.reducer,
});

export default rootReducer;
