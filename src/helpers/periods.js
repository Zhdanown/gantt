import store from "../store.js";
import { createRange, dateToString } from "./index";
import { getTotalProductivity } from "./machinery";

export const getArea = period => {
  const state = store.getState();
  // get all agroperiods from techmaps
  const agroperiods = state.periods.filter(x => !x.planId);
  const key = x => x.cluster.id + x.farm.id + x.culture.id + x.agrooperation.id;
  const agroperiod = agroperiods.find(x => {
    return key(x) === key(period);
  });
  return agroperiod.culture.area;
};

export const getNewDates = period => {
  const { startDate, endDate, machinery } = period;
  const range = createRange(startDate, endDate);
  const totalProductivity = getTotalProductivity(machinery);
  let square = getArea(period);

  const dates = range.map(x => {
    const prod = square / totalProductivity < 1 ? square : totalProductivity;
    square -= totalProductivity;
    return {
      date: dateToString(x, "dd.mm.yy"),
      prod: prod > 0 ? prod : 0
    };
  });
  return dates;
};

export const isComplete = d => {
  const prod = d.dates.reduce((acc, cur) => {
    return acc + cur.prod;
  }, 0);
  const area = getArea(d);
  return area <= prod;
};
