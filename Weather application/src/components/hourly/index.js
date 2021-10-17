// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class Hourly extends Component {


	// rendering a function when the button is clicked
	render() {
		let borderShow = this.props.border;
		if (borderShow == "no") {
			return (
				<table class={style.hourly}>
					<th>{this.props.time}</th>
					<tr>{this.props.icon}</tr>
					<tr>{this.props.weather}</tr>
					<tr>{this.props.temp}°C</tr>
				</table>
			);
		}
		else {
			return (
				<div class={style.hourlyContainer}>
					<table class={style.hourly}>
						<th>{this.props.time}</th>
						<tr>{this.props.icon}</tr>
						<tr>{this.props.weather}</tr>
						<tr>{this.props.temp}°C</tr>
					</table>
				</div>
			);
		}

	}
}
