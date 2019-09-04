import {
  FETCH_PLANS,
  CREATE_PLAN_PERIOD,
  DELETE_PLAN_PERIOD
} from "../actions/types";
import { deletePlanPeriod } from "../actions/plans";

const planReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PLANS:
      return [...state, ...action.payload];

    case CREATE_PLAN_PERIOD:
      return createPlannedPeriod(state, action);

    case DELETE_PLAN_PERIOD:
      return deletePlannedPeriod(state, action);

    default:
      return state;
  }
  return state;
};

export default planReducer;

function createPlannedPeriod(plans, action) {
  return updateItemInArray(plans, action.payload.planId, plan => {
    return { ...plan, periods: [...plan.periods, action.payload] };
  });
}

function deletePlannedPeriod(plans, action) {
  return updateItemInArray(plans, action.paylod, plan => {
    return {
      ...plan,
      periods: [...plan.periods.filter(item => item.id !== action.payload)]
    };
  });
}

function updateItemInArray(array, itemId, updateItemCallback) {
  return array.map(item => {
    if (item.id !== itemId) return item;
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });
}
