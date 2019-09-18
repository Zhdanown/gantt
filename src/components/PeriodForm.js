import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setSelectedPeriod } from "../actions/selectedPeriod";
import DatePicker from "./DatePicker";
// import Select from "./shared/MySelect";
import Machinery from "./Machinery";
import PeriodPreview from "./PeriodPreview";
import { getArea, getNewDates } from "../helpers/periods";
import { getTotalProductivity } from "../helpers/machinery";

function PeriodForm({ formData, ...props }) {
  const [machinery, setMachinery] = useState(formData.machinery || []);
  const [plan, setPlan] = useState(getPlan);
  const [area, setArea] = useState(getArea(formData));
  const [longevity, setLongevity] = useState(getLongevity(machinery, area));
  const [startDate, setStartDate] = useState(formData.startDate);
  const [endDate, setEndDate] = useState(getEndDate(startDate, longevity)); // TODO

  useEffect(() => {
    props.setSelectedPeriod(formData);
  }, []);

  useEffect(() => {
    // get new longevity
    const l = getLongevity(machinery, area);
    // get new endDate
    setLongevity(l);
    setEndDate(getEndDate(startDate, l));
  }, [machinery]);

  //--------------------------------------------------
  function getPlan() {
    return props.plans.find(x => x.id === formData.planId);
  }
  function getLongevity(machinery, area) {
    const totalProductivity = getTotalProductivity(machinery);
    if (!totalProductivity) return null;
    let longevity = area / totalProductivity;
    return Math.ceil(longevity * 10) / 10;
  }
  function getEndDate(startDate, longevity) {
    if (!longevity) return null;
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.ceil(longevity) - 1);
    return endDate;
  }
  //--------------------------------------------------

  // function getTotalProductivity(machinery) {
  //   return machinery.reduce((acc, cur) => {
  //     return acc + cur.productivity;
  //   }, 0);
  // }

  const addMachinery = newMachinery => {
    setMachinery([...machinery, newMachinery]);
  };

  const removeMachinery = machineryToRemove => {
    let newMachinery = [...machinery];

    for (let i = 0; i < newMachinery.length; i++) {
      let item = newMachinery[i];
      const { vehicle, workEquipment } = item;
      if (
        vehicle.id === machineryToRemove.vehicle.id &&
        workEquipment.id === machineryToRemove.workEquipment.id
      ) {
        newMachinery.splice(i, 1);
        break;
      }
    }

    setMachinery(newMachinery);
  };

  const savePeriod = () => {
    // // get dates
    // const range = createRange(startDate, endDate);

    // const totalProductivity = getTotalProductivity(machinery);
    // let square = area;
    // const dates = range.map(x => {
    //   const prod = square / totalProductivity < 1 ? square : totalProductivity;
    //   square -= totalProductivity;
    //   return {
    //     date: dateToString(x, "dd.mm.yy"),
    //     prod: prod > 0 ? prod : 0
    //   };
    // });

    //get new Dates

    const period = {
      id: formData.planId ? formData.id : getNewId(),
      planId: plan ? plan.id : "new Plan Id",
      cluster: formData.cluster,
      farm: formData.farm,
      culture: { id: formData.culture.id, name: formData.culture.name },
      agrooperation: formData.agrooperation,
      machinery
    };

    function getNewId() {
      return "newPeriodId" + Math.floor(Math.random() * 1000);
    }

    const dates = getNewDates({ ...period, startDate, endDate });

    props.onSubmit({ ...period, dates });
  };

  const { cluster, culture, farm, agrooperation } = formData;

  return (
    <>
      <div className="modal-content">
        <div>
          <span>
            {culture.name} - {agrooperation.name} <b>{area} га</b>
          </span>
          <span className="right">
            {cluster.name} - {farm.name}
          </span>
        </div>
        <form name="period-form">
          {/* <Select
              name="newPeriodPlan"
              label="План"
              options={this.props.plans}
              selectedValue={this.state.plan}
              disabled={this.state.plan}
            /> */}

          <Machinery
            machinery={machinery}
            addMachinery={addMachinery}
            removeMachinery={removeMachinery}
            getTotalProductivity={getTotalProductivity}
          />

          <div className="row">
            <div className="input-field col s6">
              <DatePicker
                name="startPeriodDate"
                label="Дата начала"
                date={startDate}
                onSelect={date => setStartDate(date)}
              />
            </div>

            <div className="input-field col s6">
              <DatePicker
                name="endPeriodDate"
                label="Дата завершения"
                date={endDate}
                onSelect={date => setEndDate(date)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col s12 center">
              <label>
                Расчетная длительность выполнения операции (дн.) -{" "}
                <b>{longevity} </b>
              </label>
              <PeriodPreview />
            </div>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button
          className="btn waves-effect waves-light modal-close red lighten-2 left"
          type="button"
          name="action"
          form="period-form"
          onClick={props.deletePeriod}
        >
          Delete
          <i className="material-icons right">delete_outline</i>
        </button>{" "}
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          Отмена
        </a>
        <button
          className="btn waves-effect waves-light modal-close"
          type="submit"
          name="action"
          form="period-form"
          onClick={savePeriod}
        >
          OK
          <i className="material-icons right">send</i>
        </button>{" "}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    plans: Object.values(state.plans)
  };
};

export default connect(
  mapStateToProps,
  { setSelectedPeriod }
)(PeriodForm);
