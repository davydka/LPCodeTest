import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

export default class Question extends Component {
	render() {
		return (
			<Link className='btn btn-primary' to='/'>Should we build more schools?</Link>
		);
	}
}

