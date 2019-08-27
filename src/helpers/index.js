export const getDateRange = function(periods) {
  // Get all dates
  let dates = [];
  periods.forEach(period => {
    dates = [...dates, ...period.dates.map(d => d.date)];
  });
  // get inique values
  dates = [...new Set(dates)];

  // convert dateStrings to dates
  dates = dates.map(d => stringToDate(d));

  // get min and max date in periods
  let min = new Date(dates[0]);
  let max = new Date(dates[0]);
  for (let d of dates) {
    if (d.getTime() < min.getTime()) {
      min = new Date(d);
    }
    if (d.getTime() > max.getTime()) {
      max = new Date(d);
    }
  }

  // create dates range
  const range = createRange(min, max);
  return range;
};

export const createRange = function(min, max) {
  //--------------------------
  min.setDate(min.getDate() - 5);
  max.setDate(max.getDate() + 15);
  //--------------------------
  let range = [];
  let start = new Date(min);
  while (start.getTime() <= max.getTime()) {
    range.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return range;
};

export const stringToDate = function(dateString) {
  const [day, month, year] = dateString.split(".");
  const date = new Date("20" + year, +month - 1, day);
  return date;
};

export const dateToString = function(dateObj, format) {
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();

  switch (format) {
    case "dd.mm":
      break;

    default:
      date = `0${date}`.slice(-2);
      month = `0${month}`.slice(-2);
      return `${date}.${month}`;
  }
};

export const getLeftOffset = function(startDate, datesRange) {
  let index = null;
  datesRange.forEach((item, i) => {
    if (item.getTime() === startDate.getTime()) index = i;
  });
  return index;
};

export const getTopOffset = function(period, periods) {
  let index = null;
  periods.forEach((p, i) => {
    if (p.id === period.id) index = i;
  });
  return index;
};

export const sortPeriods = function(periods) {
  const arr = [...periods];
  arr.sort((p1, p2) => {
    // Сортировать по кластерам
    if (p1.cluster.name > p2.cluster.name) return -1;
    if (p1.cluster.name < p2.cluster.name) return 1;

    // Сортировать по подразделению

    // Сортировать по культуре
    if (p1.culture.name > p2.culture.name) return -1;
    if (p1.culture.name < p2.culture.name) return 1;
  });
  return arr;
};
