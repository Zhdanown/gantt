import { FETCH_VEHICLES, FETCH_WORKEQUIPMENT } from "../actions/types";
import { vehicles, workEquipment } from "../data/machinery";

// export const fetchMachinery = () => {
//   return {
//     type: FETCH_MACHINERY,
//     payload: machinery
//   };
// };

export const fetchVehicles = () => {
  return {
    type: FETCH_VEHICLES,
    payload: vehicles
  };
};

export const fetchWorkEquipment = () => {
  return {
    type: FETCH_WORKEQUIPMENT,
    payload: workEquipment
  };
};
