import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import planReducer from "./planReducer";
import periodsReducer from "./periodReducer";
import selectedPeriodReducer from "./selectedPeriod";
import machineryReducer from "./machineryReducer";
import matrixReducer from "./matrixReducer";

const rootReducer = combineReducers({
  periods: periodsReducer,
  selectedPeriod: selectedPeriodReducer,
  plans: planReducer,
  machinery: machineryReducer,
  form: formReducer,
  matrix: matrixReducer
});

export default rootReducer;
