import { SET_SELECTED_PERIOD } from "../actions/types";

const selectedPeriodReducer = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_PERIOD:
      return action.payload;

    default:
      return state;
  }
};

export default selectedPeriodReducer;
