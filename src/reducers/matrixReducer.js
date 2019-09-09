import { FETCH_MATRIX } from "../actions/types";

const matrixReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MATRIX:
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default matrixReducer;
