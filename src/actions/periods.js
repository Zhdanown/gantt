import { FETCH_PERIODS, CREATE_PERIOD, DELETE_PERIOD } from "./types";
import { periods } from "../data2";

export const fetchPeriods = () => {
  return {
    type: FETCH_PERIODS,
    payload: periods
  };
};

export const createPeriod = formData => {
  return {
    type: CREATE_PERIOD,
    payload: formData
  };
};

// export const deletePeriod = periodId => {
//   return {
//     type: DELETE_PERIOD,
//     payload: periodId
//   };
// };
