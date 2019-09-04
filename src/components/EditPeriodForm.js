import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import DatePicker from "./DatePicker";
import PeriodForm from "./PeriodForm";
// import { createPeriod } from "../actions/periods";
import { deletePlanPeriod } from "../actions/plans";
import { dateToString } from "../helpers";

function EditPeriodForm(props) {
  let [startDate, setStartDate] = useState(props.formData.date);
  let [endDate, setEndDate] = useState();

  const onStartDateChange = date => {
    setStartDate(date);
  };
  const onEndDateChange = date => {};

  const onFormSubmit = e => {
    e.preventDefault();

    // const data = {
    //   id: 12,
    //   cluster: { id: "tamboflasjdfla", name: "Tambov" },
    //   farmId: "bun",
    //   culture: { id: "soyadflajdsfla", name: "soy" },
    //   dates: [
    //     { date: "12.08.19" },
    //     { date: "13.08.19" },
    //     { date: "14.08.19" },
    //     { date: "15.08.19" },
    //     { date: "16.08.19" },
    //     { date: "17.08.19" }
    //   ]
    // };

    // props.createPeriod(data);
  };

  const onPeriodFormSubmit = formValues => {
    console.log(formValues);
  };

  const deletePeriod = () => {
    const { id } = props.formData;
    props.deletePlanPeriod(id);
  };

  const renderModalContent = () => {
    if (Object.keys(props.formData).length) {
      const {
        cluster,
        culture,
        farmName,
        agrooperation,
        dates
      } = props.formData;
      // const startDate = dates[0].date;
      // const endDate = dates[dates.length - 1].date;
      return (
        <div>
          <h5>
            {cluster.name} > {farmName} > {culture.name}
          </h5>

          <form id="period-form" onSubmit={onFormSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="vehicle" type="text" className="validate" />
                <label htmlFor="vehicle">Самоходная техника</label>
              </div>
              <div className="input-field col s6">
                <input id="work-equipment" type="text" className="validate" />
                <label htmlFor="work-equipment">Сельхозорудие</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <DatePicker
                  name="startPeriodDate"
                  date={startDate}
                  onSelect={date => setStartDate(date)}
                />
                <label>Плановая дата начала</label>
              </div>
              <div className="input-field col s6">
                <DatePicker
                  name="endPeriodDate"
                  onSelect={date => setEndDate(date)}
                />
                <label>Плановая дата завершения</label>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };

  const renderModalFooter = () => {
    return (
      <>
        <button
          className="btn waves-effect waves-light modal-close red lighten-2 left"
          type="button"
          name="action"
          form="period-form"
          onClick={deletePeriod}
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
          onClick={() => props.onOk()}
        >
          OK
          <i className="material-icons right">send</i>
        </button>{" "}
      </>
    );
  };

  return (
    <Modal name="editPeriod" isOpen={props.isOpen} onClose={props.onClose}>
      {Object.keys(props.formData).length ? (
        <PeriodForm
          formData={props.formData}
          onSubmit={formValues => onPeriodFormSubmit(formValues)}
        />
      ) : null}
      {renderModalFooter()}
    </Modal>
  );
}

export default connect(
  null,
  { deletePlanPeriod }
)(EditPeriodForm);

EditPeriodForm.defaultProps = {
  onOk: () => {}
};
