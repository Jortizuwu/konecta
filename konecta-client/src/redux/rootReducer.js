import { combineReducers } from "@reduxjs/toolkit";

import uiReducer from "./reducers/ui";

const rootReducer = combineReducers({
  ui: uiReducer,
});

export default rootReducer;
