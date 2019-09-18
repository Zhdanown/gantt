import { SET_SELECTED_PERIOD } from "./types";

export const setSelectedPeriod = period => {
  return {
    type: SET_SELECTED_PERIOD,
    payload: period
  };
};
