import { FETCH_PLANS, CREATE_PLAN, DELETE_PLAN, FETCH_PERIODS } from "./types";
import { plans } from "../data/plans";

export const fetchPlans = () => {
  // remove periods from plans
  const purifiedPlans = plans.map(item => {
    const { periods, ...rest } = item;
    return rest;
  });

  return {
    type: FETCH_PLANS,
    payload: purifiedPlans
  };
};

export const fetchPlannedPeriods = () => {
  // flatmap fetched plans
  const periods = plans.flatMap(item =>
    item.periods.map(period => ({ planId: item.id, ...period }))
  );
  return {
    type: FETCH_PERIODS,
    payload: periods
  };
};

export const createPlanPeriod = data => {
  return {
    type: CREATE_PLAN,
    payload: data
  };
};

export const deletePlanPeriod = periodPlanId => {
  debugger;
  return {
    type: DELETE_PLAN,
    payload: periodPlanId
  };
};
