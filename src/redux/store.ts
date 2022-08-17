import { configureStore } from "@reduxjs/toolkit";
import { superheroReducer } from "./superheroes";

const store = configureStore({
  reducer: {
    superheroes: superheroReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
