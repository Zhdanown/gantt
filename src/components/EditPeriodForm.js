import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import PeriodForm from "./PeriodForm";
import { editPeriod, deletePeriod } from "../actions/periods";
// import { deletePlanPeriod } from "../actions/plans";
import { createRange, dateToString } from "../helpers";

function EditPeriodForm(props) {
  const onPeriodSubmit = formValues => {
    // get new dates
    const range = createRange(formValues.startDate, formValues.endDate);
    let dates = range.map(x => ({ date: dateToString(x, "dd.mm.yy") }));
    const { startDate, endDate, ...restValues } = formValues;

    props.editPeriod({ ...restValues, dates });
  };

  const deletePeriod = () => {
    const { id } = props.formData;
    props.deletePeriod(id);
  };

  return (
    <Modal name="editPeriod" isOpen={props.isOpen} onClose={props.onClose}>
      {props.isOpen ? (
        <PeriodForm
          formData={props.formData}
          onSubmit={formValues => onPeriodSubmit(formValues)}
          deletePeriod={deletePeriod}
        />
      ) : null}
    </Modal>
  );
}

export default connect(
  null,
  { editPeriod, deletePeriod }
)(EditPeriodForm);
