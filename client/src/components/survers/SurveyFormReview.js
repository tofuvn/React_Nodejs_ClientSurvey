import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import FIELDS from './formFields'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = _.map(FIELDS, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    )
  })

  return (
    <div>
      <h5> Please confirm your entries </h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
      <button onClick={() => submitSurvey(formValues, history)} className="green right white-text btn-flat">Send Survey<i className="material-icons right">email</i></button>
    </div>

  )
}

const mapStateToProps = (state, ownProps) => {
  return { formValues: state.form.surveyForm.values}
}



export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))