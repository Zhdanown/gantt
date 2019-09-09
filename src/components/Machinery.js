import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/sass/machinery.scss";
import Select from "./Select";

export class Machinery extends Component {
  state = {
    vehicle: null,
    workEquipment: null
  };

  componentDidMount() {
    let elems = document.querySelectorAll(".machinery .collapsible");
    window.M.Collapsible.init(elems, { accordion: false });
  }

  onVehicleChange = vehicle => {
    console.log(vehicle);
    this.setState({ vehicle });
  };
  onWorkEquipmentChange = workEquipment => {
    this.setState({ workEquipment });
  };

  addMachinery = () => {
    const { vehicle, workEquipment } = this.state;
    if (!vehicle || !workEquipment) {
      console.log("select machinery first!");
    } else {
      this.props.addMachinery({ vehicle, workEquipment });
    }
  };

  removeMachinery = item => {
    console.log(item);
    this.props.removeMachinery(item);
  };

  renderMachineryList() {
    const { machinery } = this.props;
    if (!machinery.length)
      return <div className="center-align">Нет задействованной техники</div>;
    else
      return (
        <>
          {machinery.map((item, index) => {
            const { vehicle, workEquipment } = item;
            return (
              <div key={index} className="machinery-item">
                {vehicle.name} + {workEquipment.name}
                <i
                  className="close material-icons"
                  onClick={() => this.removeMachinery(item)}
                >
                  close
                </i>
              </div>
            );
          })}
        </>
      );
  }

  renderNewMachneryForm() {
    return (
      <>
        <div className="row">
          <div className="col s6">
            <Select
              name="vehicle"
              label="Самоходная техника"
              options={this.props.vehicles}
              selectedValue={this.state.vehicle}
              onChange={this.onVehicleChange}
            />
          </div>
          <div className="col s6">
            <Select
              name="work-equipment"
              label="Сельхозорудие"
              options={this.props.workEquipment}
              onChange={this.onWorkEquipmentChange}
              selectedValue={this.state.workEquipment}
            />
          </div>
        </div>

        <div className="center-align">{this.renderaddMachineryButton()}</div>
      </>
    );
  }

  renderaddMachineryButton = () => {
    const { vehicle, workEquipment } = this.state;
    return (
      <button
        type="button"
        className="btn"
        onClick={this.addMachinery}
        disabled={
          !vehicle || !workEquipment || !vehicle.id || !workEquipment.id
        }
      >
        Назначить
        <i className="material-icons right">add</i>
      </button>
    );
  };

  render() {
    return (
      <div className="machinery">
        <ul className="collapsible expandable">
          <li>
            <div className="collapsible-header">
              Задействованная техника ({this.props.machinery.length})
            </div>
            <div className="collapsible-body">{this.renderMachineryList()}</div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">add</i>Назначить технику
            </div>
            <div className="collapsible-body">
              {this.renderNewMachneryForm()}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

Machinery.defaultProps = {
  machinery: []
};

const mapStateToProps = state => {
  return {
    vehicles: state.machinery.vehicles,
    workEquipment: state.machinery.workEquipment
  };
};

export default connect(mapStateToProps)(Machinery);
