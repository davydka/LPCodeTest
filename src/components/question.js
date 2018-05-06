import React from 'react';
import {Field, reduxForm} from 'redux-form';
import renderField from './renderField'
import validate from '../utils/validate'

const Question = (props) => {
  const { handleSubmit, question, categories, page} = props;
  // console.log(categories);
  // props.emitter.emit('thing', {cool:'coool'});

  function renderCategories() {
    return categories.map(({id, name, score}) =>{
      return <div key={id}>{name}: {score}</div>
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{question.text}</h3>
      <Field name={question.name} type="radio" component={renderField} label="Yes" value="yes" />
      <Field name={question.name} type="radio" component={renderField} label="No" value="no" />
      <div>
        <button type="submit" className="next">Next</button>
      </div>
      {page !== 0 && renderCategories()}
    </form>
  )
};

export default reduxForm({
  form: 'LPCodeTest',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(Question)
