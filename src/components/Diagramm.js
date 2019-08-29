import React from "react";
import * as d3 from "d3";
import "../styles/sass/diagramm.scss";
import { periods } from "../data";
import { periods as periods2 } from "../data2";
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
var updateChart = null;

class Diagramm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateRange: [],
      periods: []
    };

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

    this.setState({ dateRange: dateRange, periods: sortedPeriods });
    console.log(dateRange, sortedPeriods);
    updateChart = this.initChart(dateRange, sortedPeriods);

    document.addEventListener("keydown", e => {
      // let { dateRange, periods } = this.state;
      const dateRange = getDateRange(periods2);
      // sort recieved periods
      const _periods = periods2.map(period => {
        return {
          ...period,
          dates: period.dates.map(day => ({
            ...day,
            date: stringToDate(day.date)
          }))
        };
      });
      const sortedPeriods = sortPeriods(_periods);
      console.log(dateRange, sortedPeriods);
      if (e.code === "KeyR") {
        sortedPeriods.pop();
      }
      updateChart(dateRange, sortedPeriods);
      // debugger
      // // dateRange.pop();
      // periods.push({
      //   cluster: { id: "sfjsdfjdjlsdfjllsdf", name: "Kursk" },
      //   culture: { id: "whteafalsdfj", name: "wheat" },
      //   dates: [
      //     { date: new Date(2019, 7, 22) },
      //     { date: new Date(2019, 7, 23) },
      //     { date: new Date(2019, 7, 24) }
      //   ],
      //   farmId: "bun",
      //   id: 5
      // });
      // console.log(periods);
      // debugger;
      // updateChart(dateRange, periods);
    });
  }

  componentDidUpdate() {
    if (updateChart && this.state.periods.length) {
      // console.log(this.state.dateRange);
      // let { dateRange, periods } = this.state;
      // setTimeout(() => {
      //   dateRange.pop();
      //   periods.push({
      //     cluster: { id: "sfjsdfjdjlsdfjllsdf", name: "Kursk" },
      //     culture: { id: "whteafalsdfj", name: "wheat" },
      //     dates: [
      //       { date: new Date(2019, 7, 22) },
      //       { date: new Date(2019, 7, 23) },
      //       { date: new Date(2019, 7, 24) }
      //     ],
      //     farmId: "bun",
      //     id: 5
      //   });
      //   console.log(periods);
      //   // debugger;
      //   updateChart(dateRange, periods);
      // }, 1000);
      // setTimeout(() => {
      //   dateRange.push(new Date(2019, 8, 4));
      //   // debugger;
      //   updateChart(dateRange, periods);
      // }, 2000);
    }
  }

  initChart = (data_dates, data_periods) => {
    var legend = d3.select(".legend");
    var empty_legend_row = legend.append("div").attr("class", "legend-row");
    var chart = d3.select(".chart");
    var dates = chart.append("div").attr("class", "dates");
    // draw grid
    var grid = chart.append("div").attr("class", "grid");
    console.log("init");

    update(data_dates, data_periods);

    function update(_dates, periods) {
      var t = d3.transition().duration(750);

      //************ LEGEND_ROW ***************/
      // JOIN new data with old elements.
      var legend_row = legend
        .selectAll(".legend-row:not(:first-child)")
        .data(periods, d => d.id);
      // EXIT old elements not present in new data
      legend_row
        .exit()
        .style("opacity", 1)
        .transition(t)
        .style("opacity", 0)
        .remove();

      // ENTER new elements present in new data
      var enter_legend_row = legend_row
        .enter()
        .append("div")
        .attr("class", "legend-row")
        .html(
          d =>
            d.id + " " + d.cluster.name + " " + d.culture.name + " " + d.farmId
        )
        .on("click", d => {
          console.log(d);
        })
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);

      //************ LEGEND_ROW ***************/

      //************ DATES ***************/
      var date = dates.selectAll(".date.cell").data(_dates);
      date
        .exit()
        .style("opacity", 1)
        .transition(t)
        .style("opacity", 0)
        .remove();
      date
        .enter()
        .append("div")
        .attr("class", "date cell")
        .html(d => dateToString(d))
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);
      //************ DATES ***************/

      //************ GRID ***************/
      var grid_row = grid.selectAll(".grid-row").data(periods, d => d.id);

      // transitions cells from rows that are exiting
      grid_row
        .exit()
        .selectAll(".cell")
        .remove();

      grid_row.exit().remove();

      // enter new rows
      var grid_row_enter = grid_row
        .enter()
        .append("div")
        .attr("class", "grid-row");

      // merge entered rows with pre-existing
      grid_row = grid_row_enter.merge(grid_row);

      // update all
      grid_row
        .style("opacity", 0)
        .transition()
        .style("opacity", 1)
        .duration(t);

      // do an enter/exit/update cycle with childs elements
      var grid_cells = grid_row.selectAll(".cell").data(_dates, d => d);

      grid_cells
        .enter()
        .append("div")
        .attr("class", "cell")
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);

      //************ GRID ***************/

      //************ PERIODS ***************/
      var period = grid.selectAll(".period").data(periods, d => d.id);
      period
        .exit()
        .style("opacity", 1)
        .transition(t)
        .style("opacity", 0)
        .remove();

      // Update old elements present in data
      period
        .style("top", d => getTopDimension(d) + "px")
        .style("left", d => getLeftDimension(d) + "px");

      period
        .enter()
        .append("div")
        .attr("class", "period")
        .style("top", d => getTopDimension(d) + "px")
        .style("left", d => getLeftDimension(d) + "px")

        .on("mouseover", e => {
          console.log(e);
        });

      //period day
      var period_day = d3
        .selectAll(".period")
        .selectAll(".cell")
        .data(d => d.dates, d => d.date)
        .enter()
        .append("div")
        .attr("class", "cell")
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);
      //************ PERIODS ***************/
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
    }

    // d3.interval(function() {
    //   _dates.pop();
    //   update(_dates, periods);
    // }, 3000);

    return update;
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
