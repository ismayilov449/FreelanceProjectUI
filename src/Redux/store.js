import { combineReducers, configureStore } from "@reduxjs/toolkit";
//reducers
import userSlice from "./Slicers/user.slice";

const rootReducer = combineReducers({
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
