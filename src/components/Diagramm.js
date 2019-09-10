import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import "../styles/sass/diagramm.scss";
import EditPeriodForm from "./EditPeriodForm";
import CreatePeriodForm from "./CreatePeriodForm";

// import PeriodForm from "./PeriodForm";

import {
  getDateRange,
  createRange,
  dateToString,
  getLeftOffset,
  getTopOffset,
  getUniqueRows,
  processPeriods,
  processPlans
} from "../helpers";
import { stretchPeriod, movePeriod } from "../helpers/periodDnD";

import { fetchPlannedPeriods, fetchPlans } from "../actions/plans";
import { fetchAgroPeriods, editPeriod } from "../actions/periods";
import { fetchVehicles, fetchWorkEquipment } from "../actions/machinery";
import { fetchMatrix } from "../actions/matrix";
import { periods } from "../data/data";

import { CELL_HEIGHT, CELL_WIDTH } from "../constants";

var updateChart = null;

class Diagramm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // dateRange: [],
      // periods: [],
      isEditPeriodFormOpen: false,
      isCreatePeriodFormOpen: false,
      currentData: {}
    };

    this.diagramm_ref = React.createRef();
  }

  componentDidMount() {
    this.props.fetchVehicles();
    this.props.fetchWorkEquipment();
    this.props.fetchAgroPeriods();
    this.props.fetchPlannedPeriods();
    this.props.fetchPlans();
    this.props.fetchMatrix();
    const { plannedPeriods, agroPeriods } = this.props;

    // get initial date range
    const dateRange = getDateRange([...agroPeriods, ...plannedPeriods]);
    // sort periods and convert date strings to objects
    const processedAgroPeriods = processPeriods(agroPeriods, dateRange);
    const processedPlannedPeriods = processPeriods(plannedPeriods, dateRange);

    // this.setState({ dateRange: dateRange, periods: processedPeriods });
    updateChart = this.initChart(
      dateRange,
      processedAgroPeriods,
      processedPlannedPeriods
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.agroPeriods === this.props.agroPeriods &&
      prevProps.plannedPeriods === this.props.plannedPeriods
    )
      return;
    if (updateChart && this.props.agroPeriods.length) {
      const { plannedPeriods, agroPeriods } = this.props;

      const dateRange = getDateRange([...agroPeriods, ...plannedPeriods]);

      const processedAgroPeriods = processPeriods(agroPeriods, dateRange);
      const processedPlannedPeriods = processPeriods(plannedPeriods, dateRange);
      updateChart(dateRange, processedAgroPeriods, processedPlannedPeriods);
    }
  }

  openEditPeriodForm = (period, date) => {
    this.setState({
      currentData: { ...period, startDate: period.dates[0].date },
      isEditPeriodFormOpen: true
    });
  };

  openCreatePeriodForm = (period, date) => {
    this.setState({
      currentData: { ...period, startDate: date },
      isCreatePeriodFormOpen: true
    });
  };

  initChart = (data_dates, agro_periods, planned_periods) => {
    var legend = d3.select(".legend");
    /*var empty_legend_row = */ legend
      .append("div")
      .attr("class", "legend-row");
    var chart = d3.select(".chart");
    var dates = chart.append("div").attr("class", "dates");
    // draw grid
    var grid = chart.append("div").attr("class", "grid");

    const update = (_dates, agro_periods, planned_periods) => {
      var diagramm = this;
      var t = d3.transition().duration(750);

      //************ LEGEND_ROW ***************/
      // JOIN new data with old elements.
      var legend_row = legend
        .selectAll(".legend-row:not(:first-child)")
        .data(getUniqueRows(agro_periods), d => d.id);
      // EXIT old elements not present in new data
      legend_row
        .exit()
        .style("opacity", 1)
        .transition(t)
        .style("opacity", 0)
        .remove();

      // ENTER new elements present in new data
      var enter_legend_row = legend_row.enter();

      enter_legend_row
        .append("div")
        .attr("class", "legend-row")
        // .html(
        //   d =>
        //     d.cluster.name +
        //     " " +
        //     d.culture.name +
        //     " " +
        //     d.farm.name +
        //     " " +
        //     d.agrooperation.name
        // )
        // .append("span")
        .on("click", d => {
          console.log(d);
        })
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);

      enter_legend_row.append("span");

      //************ LEGEND_ROW ***************/

      //************ DATES ***************/
      var date = dates.selectAll(".date.cell").data(_dates, d => d);
      date.exit().remove();

      var date_enter = date
        .enter()
        .append("div")
        .attr("class", "date cell")
        .html(d => dateToString(d));

      date = date_enter.merge(date);

      // update all dates
      date
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);

      // date.on("click", d => {
      //   console.log(d);a
      // });
      // date
      //   .exit()
      //   .style("opacity", 1)
      //   .transition(t)
      //   .style("opacity", 0)
      //   .remove();
      // date
      //   .enter()
      //   .append("div")
      //   .attr("class", "date cell")
      //   .html(d => dateToString(d))
      //   .style("opacity", 0)
      //   .transition(t)
      //   .style("opacity", 1);
      //************ DATES ***************/

      //************ GRID ***************/
      var grid_row = grid
        .selectAll(".grid-row")
        .data(getUniqueRows(agro_periods), d => d.id);

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
        .transition(t)
        .style("opacity", 1);

      // do an enter/exit/update cycle with childs elements
      var grid_cells = grid_row
        .selectAll(".cell")
        .data(d => d.dateRange, d => d);

      // grid_cells
      // .style("opacity", 0)
      // .transition(t)
      // .style("opacity", 1);

      grid_cells
        .exit()
        // .transition(t)
        // .style("opacity", 0)
        .remove();

      grid_cells
        .enter()
        .append("div")
        .attr("class", "cell")
        .on("click", function(d) {
          let period = { ...d3.select(this).node().parentNode.__data__ };
          period.dates = [];
          diagramm.openCreatePeriodForm(period, d);
        });
      // .style("opacity", 0)
      // .transition(t)
      // .style("opacity", 1)
      // .style("width", CELL_WIDTH + "px");

      //************ GRID ***************/

      //************ AGRO-PERIODS ***************/
      var period_agro = grid
        .selectAll(".period.agro")
        .data(agro_periods, d => d.id);
      period_agro
        .exit()
        .style("opacity", 1)
        .transition(t)
        .style("opacity", 0)
        .remove();

      // Update old elements present in data
      period_agro
        .transition(t)
        .style(
          "top",
          d => getTopDimension(d, getUniqueRows(agro_periods)) + "px"
        )
        .style("left", d => getLeftDimension(d) + "px");

      period_agro
        .enter()
        .append("div")
        .attr("class", "period agro")
        .on("click", e => {
          // console.log(e);
        })
        .transition(t)
        .style(
          "top",
          d => getTopDimension(d, getUniqueRows(agro_periods)) + "px"
        )
        .style("left", d => getLeftDimension(d) + "px");

      // agro-period day
      /*var period_agro_day = */ d3.selectAll(".period.agro")
        .selectAll(".cell")
        .data(d => d.dates, d => d.date)
        .enter()
        .append("div")
        .attr("class", "cell")
        .on("click", function(d) {
          // let period = d3.select(this).node().parentNode.__data__;
          // diagramm.openEditPeriodForm(period, d);
        })
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);
      //************ AGRO-PERIODS ***************/
      //************ PLANNED-PERIODS ***************/
      var period_plan = grid
        .selectAll(".period.plan")
        .data(planned_periods, d => d.id);

      period_plan
        .exit()
        .transition(t)
        .style("opacity", 0)
        .remove();

      // Update old elements present in data
      period_plan
        .transition(t)
        .style(
          "top",
          d => getTopDimension(d, getUniqueRows(agro_periods)) + "px"
        )
        .style("left", d => getLeftDimension(d) + "px");

      period_plan
        .selectAll(".cell")
        .data(d => d.dates)
        .exit()
        .transition(t)
        .style("opacity", 0)
        .remove();

      // enter new period plans
      var period_plan_enter = period_plan.enter();
      period_plan_enter
        .append("div")
        .attr("class", "period plan")
        .style("transform", "translate(-45px)")
        .transition(t)
        .style("transform", "translate(0)")
        .style(
          "top",
          d => getTopDimension(d, getUniqueRows(agro_periods)) + "px"
        )
        .style("left", d => getLeftDimension(d) + "px");

      // period plan day
      var period_plan_day = d3
        .selectAll(".period.plan")
        .selectAll(".cell")
        .data(d => d.dates, d => d.date)
        .enter()
        .append("div")
        .attr("class", "cell")
        .on("click", function(d) {
          let period = d3.select(this).node().parentNode.__data__;
          diagramm.openEditPeriodForm(period, d);
        })
        .style("opacity", 0)
        .transition(t)
        .style("opacity", 1);

      //********* APPEND PERIOD CONTROLS *********/

      // remove old controls
      grid.selectAll(".period.plan .ctrl").remove();

      // append new controls
      grid
        .selectAll(".period.plan")
        .append("span")
        .attr("class", "ctrl right");
      grid
        .selectAll(".period.plan")
        .insert("span", ".cell")
        .attr("class", "ctrl left");

      //********* MOVE PERIOD *********/
      grid.selectAll(".period.plan").on("mousedown", movePeriod);

      //********* STRETCH PERIOD *********/
      grid.selectAll(".period.plan .ctrl").on("mousedown", stretchPeriod);

      //********************************************/
      //************ PLANNED-PERIODS ***************/
      //********************************************/
      function getTopDimension(d, periods) {
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

    update(data_dates, agro_periods, planned_periods);

    return update;
  };

  onEditPeriodModalClose = () => {
    this.setState({ isEditPeriodFormOpen: false });
  };

  onCreatePeriodModalClose = () => {
    this.setState({ isCreatePeriodFormOpen: false });
  };

  render() {
    return (
      <div className="diagramm" ref={this.diagramm_ref}>
        <section className="legend"></section>
        <section className="chart"></section>

        <EditPeriodForm
          isOpen={this.state.isEditPeriodFormOpen}
          onClose={this.onEditPeriodModalClose}
          formData={this.state.currentData}
        />
        <CreatePeriodForm
          isOpen={this.state.isCreatePeriodFormOpen}
          onClose={this.onCreatePeriodModalClose}
          formData={this.state.currentData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    plannedPeriods: state.periods.filter(x => x.planId),
    agroPeriods: state.periods.filter(x => !x.planId)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPlans,
    fetchPlannedPeriods,
    fetchAgroPeriods,
    fetchVehicles,
    fetchWorkEquipment,
    fetchMatrix,
    editPeriod
  }
)(Diagramm);
