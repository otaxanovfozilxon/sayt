import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
// redux -> state management
import rootReducer from './context/reducer';
import { legacy_createStore as createStore } from "redux"
import { Provider } from 'react-redux';
// redux-persist -> localstorage bilan ishlash redux yordamida

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import ScrollTop from './components/scoll-top/ScrollTop';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ "heart", "cart", "auth" ], // saqlanadi
  blacklist: [ "water" ] // saqlanmaydi
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer)
  let persistor = persistStore(store)
 

// const store = createStore(rootReducer)


const root = ReactDOM.createRoot(document.getElementById('laylo'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
        <ScrollTop />
        <App />
      </PersistGate>

    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
