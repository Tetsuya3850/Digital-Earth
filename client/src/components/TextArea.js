import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

class TextArea extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			value: this.props.value,
		}
	}

	componentWillReceiveProps(update) {
		this.setState({ value: update.value });
	}

	onChange = (e) => {
    const {name} = this.props;
    const value = e.target.value;

    this.setState({ value });
    this.props.onChange({ name, value });
  };

	render(){
		return(
			<div style={{ marginBottom: 20 }}>
				<label style={{ marginBottom: 10 }}>{this.props.title}</label>
				<br></br>
				<textarea
					style={{ "width" : "100%" }}
					name={this.props.name}
					rows={this.props.rows}
					value={this.props.value}
					onChange={this.onChange}
					placeholder={this.props.placeholder}
				/>
			</div>
		)
	}
}

TextArea.PropTypes = propTypes;

export default TextArea;
