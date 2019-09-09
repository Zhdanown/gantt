import React from "react";
import { connect } from "react-redux";
import Field from "./Field";
import DatePicker from "./DatePicker";
import Select from "./Select";
import Machinery from "./Machinery";
import { dateToString } from "../helpers";

class PeriodForm extends React.Component {
  state = {
    ...this.props.formData,
    plan: this.props.plans.find(x => x.id === this.props.formData.planId),
    // id,
    // agrooperation,
    // cluster,
    // culture,
    // farm,
    // machinery,
    // startDate,
    endDate: null
  };

  componentDidUpdate(prevProps) {
    window.M.updateTextFields();
    if (prevProps.formData !== this.props.formData) {
      const { planId } = this.props.formData;
      const plan = this.props.plans.find(x => x.id === planId);
      this.setState({
        ...this.props.formData,
        id: this.props.formData.id || null,
        machinery: this.props.formData.machinery || [],
        plan: plan || null,
        endDate: null
      });
    }
  }

  onSelectChange = value => {
    console.log(value);
  };

  addMachinery = machinery => {
    this.setState({ machinery: [...this.state.machinery, machinery] });
  };

  removeMachinery = machinery => {
    let newMachinery = [...this.state.machinery];

    for (let i = 0; i < newMachinery.length; i++) {
      let item = newMachinery[i];
      const { vehicle, workEquipment } = item;
      if (
        vehicle.id === machinery.vehicle.id &&
        workEquipment.id === machinery.workEquipment.id
      ) {
        newMachinery.splice(i, 1);
        break;
      }
    }

    this.setState({ machinery: newMachinery });
  };

  render() {
    const {
      cluster,
      culture,
      farm,
      agrooperation,
      startDate,
      endDate,
      machinery
    } = this.state;

    return (
      <>
        <div className="modal-content">
          <div>
            <span>
              {culture.name} - {agrooperation.name}
            </span>
            <span className="right">
              {cluster.name} - {farm.name}
            </span>
          </div>
          <form name="period-form">
            <Select
              name="newPeriodPlan"
              label="План"
              options={this.props.plans}
              selectedValue={this.state.plan}
              disabled={this.state.plan}
            />

            <Machinery
              machinery={machinery}
              addMachinery={this.addMachinery}
              removeMachinery={this.removeMachinery}
            />

            <div className="row">
              <div className="input-field col s6">
                <DatePicker
                  name="startPeriodDate"
                  label="Дата начала"
                  date={startDate}
                  onSelect={date => this.setState({ startDate: date })}
                />
              </div>

              <div className="input-field col s6">
                <DatePicker
                  name="endPeriodDate"
                  label="Дата завершения"
                  date={endDate}
                  onSelect={date => this.setState({ endDate: date })}
                />
              </div>

              <Select
                name="periodLongevity"
                label="Продолжительность выполнения операции (дн.)"
                options={[1, 2, 3, 4]}
                selectedValue={2}
                onChange={this.onSelectChange}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            className="btn waves-effect waves-light modal-close red lighten-2 left"
            type="button"
            name="action"
            form="period-form"
            onClick={this.props.deletePeriod}
          >
            Delete
            <i className="material-icons right">delete_outline</i>
          </button>{" "}
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Отмена
          </a>
          <button
            className="btn waves-effect waves-light modal-close"
            type="submit"
            name="action"
            form="period-form"
            onClick={() => this.props.onSubmit(this.state)}
          >
            OK
            <i className="material-icons right">send</i>
          </button>{" "}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    plans: Object.values(state.plans)
  };
};

export default connect(mapStateToProps)(PeriodForm);
