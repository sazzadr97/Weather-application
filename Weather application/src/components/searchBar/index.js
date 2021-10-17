// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class SearchBar extends Component {

	// rendering a function when the button is clicked
	render() {

		
		return (
			<div class={style.searchBar}>
				<input type="text"  onKeyPress={this.props.onKeyPressed} placeholder="Search For A City" />
			</div>
		);
	}

	
}
