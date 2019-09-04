import { FETCH_PLANS, CREATE_PLAN_PERIOD, DELETE_PLAN_PERIOD } from "./types";
import { plans } from "../plans";

export const fetchPlans = () => {
  return {
    type: FETCH_PLANS,
    payload: plans
  };
};

export const createPlanPeriod = data => {
  return {
    type: CREATE_PLAN_PERIOD,
    payload: data
  };
};

export const deletePlanPeriod = periodPlanId => {
  return {
    type: DELETE_PLAN_PERIOD,
    payload: periodPlanId
  };
};
