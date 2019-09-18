export const getDateRange = function([...periods]) {
  // Get all dates
  let dates = [];
  periods.forEach(period => {
    dates = [...dates, ...period.dates.map(d => d.date)];
  });
  // get unique valuesr
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

  min.setDate(min.getDate() - 3);
  max.setDate(max.getDate() + 3);

  // create dates range
  const range = createRange(min, max);
  return range;
};

export const createRange = function(min, max) {
  let range = [];
  let start = new Date(min);
  while (start.getTime() <= max.getTime()) {
    range.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return range;
};

export const stringToDate = function(dateString) {
  if (typeof dateString !== "string") {
    debugger;
  }
  const [day, month, year] = dateString.split(".");
  const date = new Date("20" + year, +month - 1, day);
  return date;
};

export const dateToString = function(dateObj, format) {
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();

  switch (format) {
    case "dd.mm.yyyy":
      date = `0${date}`.slice(-2);
      month = `0${month}`.slice(-2);
      return `${date}.${month}.${year}`;

    case "dd.mm.yy":
      date = `0${date}`.slice(-2);
      month = `0${month}`.slice(-2);
      year = `0${year}`.slice(-2);
      return `${date}.${month}.${year}`;

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
  for (const [index, p] of periods.entries()) {
    if (
      p.cluster.id === period.cluster.id &&
      p.farm.id === period.farm.id &&
      p.culture.id === period.culture.id &&
      p.agrooperation.id === period.agrooperation.id
    ) {
      return index;
    }
  }
  return null;
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

function convertPeriod(period, dateRange) {
  return {
    ...period,
    dates: period.dates.map(day => ({
      ...day,
      date: stringToDate(day.date)
    })),
    dateRange
  };
}

// export const getUniqueRows = function(periods) {
//   const uniquePeriods = periods.filter(function(a) {
//     let key = a.cluster.id + a.farmId + a.culture.id + a.agrooperation.id;
//     if (!this[key]) {
//       this[key] = true;
//       return true;
//     }
//   }, {});
//   return uniquePeriods;
// };

export const filterPeriods = function(periods, tree) {
  const filteredPeriods = periods.filter(period => {
    const cluster = tree.find(x => x.id === period.cluster.id);
    if (!cluster.children.length) return false;
    const farm = cluster.children.find(x => x.id === period.farm.id);
    if (!farm.children.length) return false;
    const culture = farm.children.find(x => x.id === period.culture.id);
    if (!culture.children.length) return false;
    return true;
  });
  return filteredPeriods;
};

export const getRows = function(periods, tree) {
  const { dateRange } = periods[0] || [];
  const row = {
    dateRange,
    cluster: {},
    farm: {},
    culture: {},
    agrooperation: {}
  };

  let rows = [];
  tree.forEach(cluster => {
    rows.push({
      ...row,
      cluster
    });
    cluster.children.forEach(farm => {
      rows.push({
        ...row,
        cluster,
        farm
      });
      farm.children.forEach(culture => {
        rows.push({
          ...row,
          cluster,
          farm,
          culture
        });
        culture.children.forEach(agrooperation => {
          let found = periods.find(
            x =>
              x.cluster.id === cluster.id &&
              x.farm.id === farm.id &&
              x.culture.id === culture.id &&
              x.agrooperation.id === agrooperation.id
          );
          if (found) rows.push(found);
        });
      });
    });
  });

  // tree.forEach(cluster => {
  //   traverseNode(cluster, cluster.children);
  // });

  // function traverseNode(node, children) {
  //   const { id, name } = node;
  //   rows.push({ id, name });
  //   children.forEach(child => traverseNode(child, child.children));
  // }

  return rows;
};

export const processPeriods = function(periods, dateRange) {
  const convertedPeriods = periods.map(period =>
    convertPeriod(period, dateRange)
  );
  const sortedPeriods = sortPeriods(convertedPeriods);
  return sortedPeriods;
};

export const processPlans = function(plans) {
  let copiedPlans = JSON.parse(JSON.stringify(plans));
  let plannedPeriods = [];
  for (let plan of copiedPlans) {
    plan.periods = processPeriods(plan.periods);
    plannedPeriods.push(
      plan.periods.map(period => ({
        ...period,
        planId: plan.id,
        planName: plan.name
      }))
    );
  }
  return plannedPeriods;
};

export const getTree = function(data) {
  const copy = [...data];
  let tree = [];
  copy.forEach(item => {
    let cluster = handleNode(item.cluster, tree, item);
    let farm = handleNode(item.farm, cluster.children, item);
    let culture = handleNode(item.culture, farm.children, item);
    handleNode(item.agrooperation, culture.children, item);
  });

  function handleNode(node, arr, item) {
    let foundNode = arr.find(item => item.id === node.id);
    if (!foundNode) {
      foundNode = { ...node, children: [], node: item };
      arr.push(foundNode);
    }
    return foundNode;
  }

  // copy.forEach(cluster => {
  //   let found = tree.find(x => x.id === cluster.id);
  //   if (!found) {
  //     found = { ...cluster, children: [], cluster }
  //     tree.push(found);
  //   } else {

  //   }
  // });

  return tree;
};
