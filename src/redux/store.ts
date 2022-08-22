import { configureStore } from "@reduxjs/toolkit";
import { superheroReducer } from "./superheroes";
import globalReducer from './global/globalSlice';


const store = configureStore({
  reducer: {
    global: globalReducer,
    superheroes: superheroReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
