import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	validate: PropTypes.func.isRequired,
};

class SingleInput extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			value: this.props.value,
			error: false,
		}
	}

	componentWillReceiveProps(update) {
		this.setState({ value: update.value });
	}

	onChange = (e) => {
		const {name} = this.props;
		const value = e.target.value;
		const error = this.props.validate ? this.props.validate(value) : false;

		this.setState({ value, error });
		this.props.onChange({ name, value, error });
	};

	render() {
		return (
			<div style={{ marginBottom: 20 }}>
				<label>{this.props.title + ' '}</label>
				<input
					name={this.props.name}
					type={this.props.inputType}
					value={this.state.value}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
				/>
				<span style={{ color: 'red' }}> *</span>
				<span style={{ color: 'red' }}>{this.state.error}</span>
			</div>
		)
	}
}

SingleInput.PropTypes = propTypes;

export default SingleInput;
