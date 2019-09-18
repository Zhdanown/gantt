import {
  FETCH_PERIODS,
  CREATE_PERIOD,
  EDIT_PERIOD,
  DELETE_PERIOD,
  SET_SELECTED_PERIOD
} from "./types";
import { periods } from "../data/data2";

export const fetchAgroPeriods = () => {
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

export const editPeriod = formData => {
  return {
    type: EDIT_PERIOD,
    payload: formData
  };
};

export const deletePeriod = periodId => {
  return {
    type: DELETE_PERIOD,
    payload: periodId
  };
};

export const setSelectedPeriod = period => {
  return {
    type: SET_SELECTED_PERIOD,
    payload: period
  };
};
