import React from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import PeriodForm from "./PeriodForm";
import { createRange, dateToString } from "../helpers";
import { createPeriod } from "../actions/periods";

function CreatePeriodForm(props) {
  const onPeriodSubmit = formValues => {
    // get period dates range
    let dateRange = createRange(formValues.startDate, formValues.endDate);
    const { startDate, endDate, ...restValues } = formValues;

    // TODO select plan

    let periodPlan = {
      ...restValues,
      id: Math.round(Math.random() * 100000).toString(),
      dates: dateRange.map(item => ({ date: dateToString(item, "dd.mm.yy") })),
      planId: "base-plan-1",
      planName: "base-plan"
    };

    props.createPeriod(periodPlan);
  };

  return (
    <Modal name="createPeriod" isOpen={props.isOpen} onClose={props.onClose}>
      {props.isOpen ? (
        <PeriodForm
          formData={props.formData}
          onSubmit={formValues => onPeriodSubmit(formValues)}
        />
      ) : null}
    </Modal>
  );
}

export default connect(
  null,
  { createPeriod }
)(CreatePeriodForm);
