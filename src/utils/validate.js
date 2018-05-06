const validate = values => {
  const errors = {};
  if (!values.question) {
    errors.question = 'Required'
  }
  if (!values.question0) {
    errors.question0 = 'Required'
  }
  if (!values.question1) {
    errors.question1 = 'Required'
  }
  if (!values.question2) {
    errors.question2 = 'Required'
  }
  if (!values.question3) {
    errors.question3 = 'Required'
  }
  if (!values.question4) {
    errors.question4 = 'Required'
  }
  if (!values.question5) {
    errors.question5 = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
};

export default validate