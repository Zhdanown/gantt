import React from "react";
import { connect } from "react-redux";
import Field from "./Field";
import DatePicker from "./DatePicker";
import Select from "./Select";
import { dateToString } from "../helpers";

class PeriodForm extends React.Component {
  state = {
    agrooperation: this.props.formData.agrooperation,
    cluster: this.props.formData.cluster,
    culture: this.props.formData.culture,
    farmId: this.props.formData.farmId,
    farmName: this.props.formData.farmName,
    startDate: this.props.formData.startDate,
    endDate: null
  };

  componentDidUpdate(prevProps) {
    window.M.updateTextFields();
    if (prevProps.formData !== this.props.formData) {
      this.setState({
        agrooperation: this.props.formData.agrooperation,
        cluster: this.props.formData.cluster,
        culture: this.props.formData.culture,
        farmId: this.props.formData.farmId,
        farmName: this.props.formData.farmName,
        startDate: this.props.formData.startDate,
        endDate: null
      });
    }
  }

  onSelectChange = value => {
    console.log(value);
  };

  render() {
    const {
      cluster,
      culture,
      farmName,
      agrooperation,
      startDate,
      endDate
    } = this.state;
    return (
      <div>
        <div>
          <span>
            {culture.name} - {agrooperation.name}
          </span>
          <span className="right">
            {cluster.name} - {farmName}
          </span>
        </div>
        <form name="period-form">
          <h6>Задействованная техника (2)</h6>
          {/* <ul className="collection">
            <li className="collection-item">Alvin</li>
            <li className="collection-item">Alvin</li>
          </ul> */}
          <div className=" center-align">
            <button type="button" className="btn">
              Добавить технику
            </button>
          </div>

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
              label="Продолжительность выполнения операции (дн.)"
              name="periodLongevity"
              options={[1, 2, 3, 4]}
              selectedValue={2}
              onChange={this.onSelectChange}
            />
          </div>
          <button
            type="button"
            className="btn waves-effect waves-light modal-close"
            onClick={() => this.props.onSubmit(this.state)}
          >
            Save Period
          </button>
        </form>

        {/* <h5>
          {cluster.name} > {farmName} > {culture.name}
        </h5>

        <div className="row agrooperation">
          <div className="col s6">
            <label htmlFor="">Агрооперация</label>
            <p>{agrooperation.name}</p>
          </div>
          <div className="col s6">
            <label htmlFor="">Сроки</label>
            <p>{getAgroTerms(dates)}</p>
          </div>
        </div>

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
        </form> */}
      </div>
    );
  }
}

const mapStateToProps = (state, { formData }) => {
  // var agrooperationName = null;

  if (Object.keys(formData).length) {
    // agrooperationName = formData.agrooperation.name;

    return {
      data: null
    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps)(PeriodForm);
