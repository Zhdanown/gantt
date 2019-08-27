import React from "react";
import * as d3 from "d3";
import "../styles/sass/diagramm.scss";
import { periods } from "../data";
import {
  getDateRange,
  stringToDate,
  dateToString,
  getLeftOffset,
  getTopOffset,
  sortPeriods
} from "../helpers";

const CELL_HEIGHT = 25;
const CELL_WIDTH = 40;

class Diagramm extends React.Component {
  constructor(props) {
    super(props);
    this.diagramm_ref = React.createRef();
  }

  componentDidMount() {
    // get initial date range
    const dateRange = getDateRange(periods);

    // sort recieved periods
    const _periods = periods.map(period => {
      return {
        ...period,
        dates: period.dates.map(day => ({
          ...day,
          date: stringToDate(day.date)
        }))
      };
    });

    const sortedPeriods = sortPeriods(_periods);

    this.initChart(dateRange, sortedPeriods);
  }

  initChart = (_dates, periods) => {
    var legend = d3.select(".legend");

    var empty_legend_row = legend.append("div").attr("class", "legend-row");

    update(_dates, periods);

    function update(_dates, periods) {
      // JOIN new data with old elements.
    }

    var legend_row = legend
      .selectAll(".legend-row:not(:first-child)")
      .data(periods)
      .enter()
      .append("div")
      .attr("class", "legend-row")
      .html(d => d.cluster.name + " " + d.culture.name + " " + d.farmId);

    var chart = d3.select(".chart");
    //------------------------------
    var dates = chart
      .append("div")
      .attr("class", "dates")
      //---------------------
      .selectAll(".date.cell")
      .data(_dates)
      .enter()
      .append("div")
      .attr("class", "date cell")
      .html(d => dateToString(d));

    // draw grid
    var grid = chart
      .append("div")
      .attr("class", "grid")
      //--------- data-row -----------
      .selectAll(".grid-row")
      .data(periods)
      .enter()
      .append("div")
      .attr("class", "grid-row")
      // .html(d => d.start_date + " - " + d.end_date)
      //--------- cell -----------
      .selectAll("cell")
      .data(_dates)
      .enter()
      .append("div")
      .attr("class", "cell");

    // draw periods
    var period = d3
      .select(".grid")
      .selectAll(".period")
      .data(periods)
      .enter()
      .append("div")
      .attr("class", "period")
      .style("top", d => getTopDimension(d) + "px")
      .style("left", d => getLeftDimension(d) + "px")
      .on("mouseover", e => {
        console.log(e);
      });

    var period_day = period
      .selectAll(".period-day")
      .data(d => d.dates)
      .enter()
      .append("div")
      .attr("class", "cell");

    function getTopDimension(d) {
      // get period offset from top of the grid
      const offset = getTopOffset(d, periods);
      return offset * CELL_HEIGHT;
    }
    function getLeftDimension(d) {
      const start_date = d.dates[0];
      // get period offset from start of date range
      const offset = getLeftOffset(start_date.date, _dates);
      return offset * CELL_WIDTH;
    }
  };

  render() {
    return (
      <div className="diagramm" ref={this.diagramm_ref}>
        <section className="legend"></section>
        <section className="chart">
          {/* <div className="dates">
            <div className="date cell">26.08</div>
           
            <div className="date cell">11.09</div>
            <div className="date cell">12.09</div>
          </div>
          <div className="data">
            <div className="data-row">
              <div className="cell">d</div>
              <div className="cell">d</div>
            </div>
            <div className="data-row">asdjfla</div>
            <div className="data-row">asdjfla</div>
            <div className="data-row">asdjfla</div>
          </div> */}
        </section>
      </div>
    );
  }
}

export default Diagramm;
