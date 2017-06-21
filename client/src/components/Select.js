import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	placeholder: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
};

class Select extends React.Component {
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

	render(){
		return(
			<div style={{ marginBottom: 20 }}>
				<select
					name={this.props.name}
					value={this.props.value}
					onChange={this.onChange}
				>
					<option value="">{this.props.placeholder}</option>
					{this.props.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
				</select>
				<span style={{ color: 'red' }}> *</span>
				<span style={{ color: 'red' }}>{this.state.error}</span>
			</div>
		)
	}
}

Select.PropTypes = propTypes;

export default Select;
