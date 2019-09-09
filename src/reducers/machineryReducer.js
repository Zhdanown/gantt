import { FETCH_VEHICLES, FETCH_WORKEQUIPMENT } from "../actions/types";

const machineryReducer = (
  state = { vehicles: [], workEquipment: [] },
  action
) => {
  switch (action.type) {
    case FETCH_VEHICLES:
      return { ...state, vehicles: [...state.vehicles, ...action.payload] };
    case FETCH_WORKEQUIPMENT:
      return {
        ...state,
        workEquipment: [...state.workEquipment, ...action.payload]
      };

    default:
      return state;
  }
};

export default machineryReducer;
