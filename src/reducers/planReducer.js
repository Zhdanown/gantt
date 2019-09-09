import { combineReducers } from "redux";
import { FETCH_PLANS, CREATE_PLAN, DELETE_PLAN } from "../actions/types";
import { deletePlanPeriod } from "../actions/plans";

const planReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLANS:
      return {
        ...state,
        ...action.payload.reduce((acc, cur) => {
          acc[cur.id] = { ...cur };
          return acc;
        }, {})
      };

    case CREATE_PLAN:
      return createPlannedPeriod(state, action);

    case DELETE_PLAN:
      return deletePlannedPeriod(state, action);

    default:
      return state;
  }
  return state;
};

export default planReducer;

function createPlannedPeriod(plans, action) {
  console.log(action);
  return updateItemInArray(plans, action.payload.planId, plan => {
    return { ...plan, periods: [...plan.periods, action.payload] };
  });
}

function deletePlannedPeriod(plans, action) {
  return updateItemInArray(plans, action.payload, plan => {
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
