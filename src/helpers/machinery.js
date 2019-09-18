import store from "../store";

export const filterVehicles = vehicles => {
  const state = store.getState();
  const { matrix } = state;
  // TODO filter by culture and agrooperation
  return vehicles.filter(vehicle => {
    return matrix.find(x => x.vehicle.id === vehicle.id);
  });
};

export const filterWorkEquipment = (equipments, vehicle) => {
  if (!vehicle) return [];
  const state = store.getState();
  const { selectedPeriod, matrix } = state;
  // TODO filter equipments by farm, culture, agrooperation and vehicle
  const filtered = equipments.filter(equipment => {
    return matrix.find(
      x => equipment.id === x.workEquipment.id && x.vehicle.id === vehicle.id
    );
  });
  return filtered;
};

export const getTotalProductivity = machinery => {
  return machinery.reduce((acc, cur) => {
    return acc + getProductivity(cur.vehicle, cur.workEquipment);
  }, 0);
};

export const getProductivity = (vehicle, equipment) => {
  const state = store.getState();
  const { matrix } = state;

  // TODO filter by culture and agrooperation
  const item = matrix.find(
    x => x.vehicle.id === vehicle.id && x.workEquipment.id === equipment.id
  );
  return item && item.productivity;
};
