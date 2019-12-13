import React, { Component } from 'react'

const SurveyField = ({label, input, meta: {touched, error}}) =>  {
    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{marginBottom: '5px'}}/>
        <div className="red-text" style={{marginBottom: '20px'}}>
          {touched && error}
        </div>
      </div>
    )
}

export default SurveyField