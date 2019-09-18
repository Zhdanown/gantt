import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/sass/machinery.scss";
import MySelect from "./shared/MySelect";
import {
  filterVehicles,
  filterWorkEquipment,
  getProductivity
} from "../helpers/machinery";

export class Machinery extends Component {
  state = {
    vehicle: null,
    workEquipment: null,
    // productivity: null,
    filteredVehicles: filterVehicles(this.props.vehicles),
    filteredWorkEquipment: []
  };

  componentDidMount() {
    let elems = document.querySelectorAll(".machinery .collapsible");
    window.M.Collapsible.init(elems, { accordion: false });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.vehicle !== this.state.vehicle ||
  //     prevState.workEquipment !== this.state.workEquipment
  //   )
  //     this.getProductivity();
  // }

  onVehicleChange = vehicle => {
    this.setState({ vehicle });
    // filter suitable workEquipment
    const filtered = filterWorkEquipment(this.props.workEquipment, vehicle);
    this.setState({
      filteredWorkEquipment: filtered,
      workEquipment: null
      // productivity: null
    });
  };
  onWorkEquipmentChange = workEquipment => {
    this.setState(() => ({ workEquipment }));
    // calculate productivity
    // this.getProductivity();
  };

  // getProductivity = () => {
  //   const { vehicle, workEquipment } = this.state;
  //   if (vehicle && workEquipment) {
  //     var productivity = calculateProductivity(
  //       this.state.vehicle,
  //       this.state.workEquipment
  //     );
  //   } else {
  //     var productivity = null;
  //   }
  //   this.setState({ productivity });
  // };

  addMachinery = () => {
    const { vehicle, workEquipment /*productivity*/ } = this.state;
    if (!vehicle || !workEquipment) {
      console.log("select machinery first!");
    } else {
      this.props.addMachinery({ vehicle, workEquipment /*productivity */ });
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
            const { vehicle, workEquipment /*productivity*/ } = item;
            return (
              <div key={index} className="machinery-item">
                <span>
                  {vehicle.name} + {workEquipment.name}
                </span>
                <span>
                  <b className="productivity">
                    {getProductivity(vehicle, workEquipment)} га/сут
                  </b>
                  <i
                    className="close material-icons"
                    onClick={() => this.removeMachinery(item)}
                  >
                    close
                  </i>
                </span>
              </div>
            );
          })}
        </>
      );
  }

  renderNewMachneryForm() {
    const {
      vehicle,
      workEquipment,
      filteredVehicles,
      filteredWorkEquipment
    } = this.state;
    return (
      <>
        <div className="row">
          <div className="col s6">
            <MySelect
              name="vehicle"
              label="Самоходная техника"
              options={filteredVehicles}
              defaultValue={vehicle}
              onChange={this.onVehicleChange}
            />
          </div>
          <div className="col s6">
            <MySelect
              name="work-equipment"
              label="Сельхозорудие"
              options={filteredWorkEquipment}
              onChange={this.onWorkEquipmentChange}
              defaultValue={workEquipment}
            />
            {/* <MySelect
              options={[{ name: "one", id: 1 }, { name: "two", id: 2 }]}
            /> */}
          </div>
        </div>
        {/* {vehicle && workEquipment ? (
          // <div className="row">
          //   <div className="col s12 center">
          //     Норма выработки {getProductivity(vehicle, workEquipment)}
          //   </div>
          // </div>
        ) : null} */}

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
        {vehicle && workEquipment ? (
          <span> ({getProductivity(vehicle, workEquipment)} га/сут)</span>
        ) : null}
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
              Задействованная техника ({this.props.machinery.length}) &nbsp;
              {this.props.machinery.length ? (
                <b>
                  {" "}
                  {this.props.getTotalProductivity(this.props.machinery)} га/сут
                </b>
              ) : null}
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
    workEquipment: state.machinery.workEquipment,
    matrix: state.matrix
  };
};

export default connect(mapStateToProps)(Machinery);
