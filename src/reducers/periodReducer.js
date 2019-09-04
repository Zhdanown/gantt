import { FETCH_PERIODS, CREATE_PERIOD, DELETE_PERIOD } from "../actions/types";

const periodReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PERIODS:
      return [...state, ...action.payload];

    case CREATE_PERIOD:
      return [...state, action.payload];

    case DELETE_PERIOD:
      return [...state.filter(period => period.id !== action.payload)];

    default:
      return state;
  }
};

export default periodReducer;
