// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class Title extends Component {

	// rendering a function when the button is clicked
	render() {
		return (
			
			<h1 class={style.title}> {this.props.text} </h1>
		);
	}
}
