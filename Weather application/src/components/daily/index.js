// import preact
import { h, render, Component } from 'preact';
import style from './style';
import WeatherIcon from '../weatherIcon';

export default class Daily extends Component {

	// <Daily heading="yes" />
	// <Daily date="Today" icon="icon" max={detailsDaily[0][2]} min={detailsDaily[0][1]} />
	// <Daily date="Tomorrow" icon="icon" max={detailsDaily[1][2]} min={detailsDaily[1][1]} />
	// <Daily date={detailsDaily[2][0]} icon="icon" max={detailsDaily[2][2]} min={detailsDaily[2][1]} />
	// <Daily date={detailsDaily[2][0]} icon="icon" max={detailsDaily[2][2]} min={detailsDaily[2][1]} />

	// rendering a function when the button is clicked
	render() {
		let data = this.props.data;
		console.log(data);
		return(
			<table class={style.dailyContainer}>
				<tr>
					<th></th>
					<th></th>
					<th>Max / Min (°C)</th>
					<th>Wind Speed (mph)</th>
				</tr>
				<tr class={style.seperatingLine}>
					<th>Today</th>
					<td>{<WeatherIcon class={style.icon} code={data[0][4]}/>}</td>
					<td>{data[0][2]} / {data[0][1]}</td>
					<td>{data[0][3]}</td>
				</tr>
				<tr class={style.seperatingLine}>
					<th>Tomorrow</th>
					<td>{<WeatherIcon class={style.icon} code={data[1][4]}/>}</td>
					<td>{data[1][2]} / {data[1][1]}</td>
					<td>{data[1][3]}</td>
				</tr>
				<tr class={style.seperatingLine}>
					<th>{data[2][0]}</th>
					<td>{<WeatherIcon class={style.icon} code={data[2][4]}/>}</td>
					<td>{data[2][2]} / {data[2][1]}</td>
					<td>{data[2][3]}</td>
				</tr>
				<tr class={style.seperatingLine}>
					<th>{data[3][0]}</th>
					<td>{<WeatherIcon class={style.icon} code={data[3][4]}/>}</td>
					<td>{data[3][2]} / {data[3][1]}</td>
					<td>{data[3][3]}</td>
				</tr>
				
			</table>
		);
	}
}