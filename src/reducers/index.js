import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import planReducer from "./planReducer";
import periodReducer from "./periodReducer";

const rootReducer = combineReducers({
  periods: periodReducer,
  plans: planReducer,
  form: formReducer
});

export default rootReducer;
