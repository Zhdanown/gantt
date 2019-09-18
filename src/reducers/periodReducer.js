import {
  FETCH_PERIODS,
  CREATE_PERIOD,
  EDIT_PERIOD,
  DELETE_PERIOD
} from "../actions/types";

const periodsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PERIODS:
      return [...state, ...action.payload];

    case EDIT_PERIOD:
      return state.map(period => {
        if (period.id === action.payload.id) return { ...action.payload };
        return period;
      });

    case CREATE_PERIOD:
      return [...state, action.payload];

    case DELETE_PERIOD:
      return [...state.filter(period => period.id !== action.payload)];

    default:
      return state;
  }
};

export default periodsReducer;
