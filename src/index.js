import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './client/App';
// import * as serviceWorker from './serviceWorker';
import cart from './client/components/reducers/cartReducer';
import customMap from './client/components/reducers/customMapReducer';
import cookie from './client/components/reducers/cookieReducer'
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore , combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import PermissionAndPersist from './PermissionAndPersist';
import { polyfillLoader } from 'polyfill-io-feature-detection';
// This function load polyfills only if needed. By default it uses polyfill.io
polyfillLoader({
  "features": "Promise,fetch",
  "onCompleted": main
});


function main(){
const persistConfig = {
  key: 'buildmymaproot',
  storage
};

const persistedReducer = persistReducer(persistConfig, combineReducers({cart, customMap, cookie}));
const store = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PermissionAndPersist persistor={persistor}>
      <App />
    </PermissionAndPersist>
  </Provider>,
    document.getElementById('root')
  );

// serviceWorker.register();

}
