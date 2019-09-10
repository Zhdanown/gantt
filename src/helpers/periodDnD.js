import * as d3 from "d3";
import store from "../store";
import { editPeriod } from "../actions/periods";

import { createRange, dateToString } from "../helpers";
import { CELL_WIDTH } from "../constants";

var win = d3.select(window);

export function stretchPeriod(d) {
  const period = d3.select(this).node().parentNode;
  const length = d.dates.length; // current amount of days in period
  let delta = 0; // changed value of days (positive | negative)
  const isLeftCtrl = this.classList.contains("left");

  // append div element with dashed border
  var resize = d3
    .select(period)
    .append("div")
    .attr("class", "resize")
    .style("width", () => length * CELL_WIDTH + "px");

  win.on("mousemove", mousemove).on("mouseup", mouseup);
  d3.event.preventDefault();
  d3.event.stopPropagation();

  function mousemove() {
    // get x coordinate relative to period div
    const [x, y] = d3.mouse(period);
    // get changed value of days and show how period will appear
    if (isLeftCtrl) {
      delta = Math.round(-x / CELL_WIDTH);
      if (delta + length <= 0) delta = -length + 1;
      resize
        .style("width", () => (length + delta) * CELL_WIDTH + "px")
        .style("left", () => -delta * CELL_WIDTH + "px");
    } else {
      delta = Math.round((x - period.clientWidth) / CELL_WIDTH);
      if (delta + length <= 0) delta = -length + 1;
      resize.style("width", () => (length + delta) * CELL_WIDTH + "px");
    }
  }

  function mouseup() {
    d3.select(period)
      .selectAll(".resize")
      .remove();
    win.on("mousemove", null);
    if (delta === 0) return;
    // get new dates range
    let end = new Date(d.dates[d.dates.length - 1].date);
    let start = new Date(d.dates[0].date);
    if (isLeftCtrl) start.setDate(start.getDate() - delta);
    else end.setDate(end.getDate() + delta);

    const newRange = createRange(start, end);
    if (newRange.length < 1) return;
    let dates = newRange.map(x => ({
      date: dateToString(x, "dd.mm.yy")
    }));
    const stretchedPeriod = {
      ...d,
      dates: dates
    };
    store.dispatch(editPeriod(stretchedPeriod));
  }
}

export function movePeriod(d) {
  const period = d3.select(this).node();
  const [initX] = d3.mouse(period);
  const length = d.dates.length; // current amount of days in period
  let delta = 0;
  // append div element with dashed border
  var resize = d3
    .select(period)
    .append("div")
    .attr("class", "resize")
    .style("width", () => length * CELL_WIDTH + "px");
  win.on("mousemove", mousemove).on("mouseup", mouseup);
  d3.event.preventDefault();
  function mousemove() {
    const [x] = d3.mouse(period);
    const dx = x - initX;
    delta = Math.round(dx / CELL_WIDTH);
    resize.style("left", () => delta * CELL_WIDTH + "px");
  }
  function mouseup() {
    win.on("mousemove", null);
    d3.select(period)
      .selectAll(".resize")
      .remove();
    if (delta === 0) return;
    let end = new Date(d.dates[d.dates.length - 1].date);
    let start = new Date(d.dates[0].date);
    start.setDate(start.getDate() + delta);
    end.setDate(end.getDate() + delta);
    const newRange = createRange(start, end);
    let dates = newRange.map(x => ({
      date: dateToString(x, "dd.mm.yy")
    }));
    const stretchedPeriod = {
      ...d,
      dates: dates
    };
    store.dispatch(editPeriod(stretchedPeriod));
  }
}
