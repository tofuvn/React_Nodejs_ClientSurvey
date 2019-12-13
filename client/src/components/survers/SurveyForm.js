import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmail from '../../utils/validateEmail'
import _ from 'lodash'
import FIELDS from './formFields'


class SurveyForm extends Component {
  renderField() {
    return _.map(FIELDS, ({label, name}) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      );
    })
  }


  render() { 
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderField()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancer
          </Link>
          <button type="reset" onClick={reset} className="green btn-flat while text" style={{"margin": "0 10px"}}>
            Default
          </button>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmail(values.recipients || '');
  _.each(FIELDS, ({ name}) => {
    if (!values[name]) {
      errors[name] = `You must provide ${name}`
    }
  })
  

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,

})(SurveyForm);