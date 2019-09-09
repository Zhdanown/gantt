import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import planReducer from "./planReducer";
import periodReducer from "./periodReducer";
import machineryReducer from "./machineryReducer";
import matrixReducer from "./matrixReducer";

const rootReducer = combineReducers({
  periods: periodReducer,
  plans: planReducer,
  machinery: machineryReducer,
  form: formReducer,
  matrix: matrixReducer
});

export default rootReducer;
