import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
//import { persistReducer } from "redux-persist";
import appointmentSlice from "../app/slices/appointmentSlice.js"

import userSlice from "./slices/userSlice.js";

const reducers = combineReducers({
  user: userSlice,
  appointment: appointmentSlice,
});

//
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

//the storage
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
