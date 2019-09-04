import React from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import PeriodForm from "./PeriodForm";
import { createRange, dateToString } from "../helpers";
import { createPlanPeriod } from "../actions/plans";

function CreatePeriodForm(props) {
  const onFormSubmit = formValues => {
    // get period dates range
    let dateRange = createRange(formValues.startDate, formValues.endDate);

    let periodPlan = {
      ...formValues,
      id: Math.round(Math.random() * 100000).toString(),
      dates: dateRange.map(item => ({ date: dateToString(item, "dd.mm.yy") })),
      planId: "base-plan-1",
      planName: "base-plan"
    };

    props.createPlanPeriod(periodPlan);
  };

  return (
    <Modal name="createPeriod" isOpen={props.isOpen} onClose={props.onClose}>
      {Object.keys(props.formData).length ? (
        <PeriodForm formData={props.formData} onSubmit={onFormSubmit} />
      ) : null}
      <button
        className="btn waves-effect waves-light modal-close"
        type="submit"
        name="action"
        form="period-form"
      >
        OK
        <i className="material-icons right">send</i>
      </button>{" "}
      {/* {renderModalFooter()} */}
    </Modal>
  );
}

export default connect(
  null,
  { createPlanPeriod: createPlanPeriod }
)(CreatePeriodForm);
