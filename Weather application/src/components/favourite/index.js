// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class favourite extends Component {

    // rendering a function when the button is clicked
    render() {

        let cFunction = this.props.clickFunction;
        let deleteFunction = this.props.deleteFunction;
        if (typeof cFunction !== 'function') {
            cFunction = () => {
                console.log("passed something as 'clickFunction' that wasn't a function !" + cFunction);
            }
        }
        // let backgroundImage = "broken clouds";
        let backgroundImage = this.props.condition;

        if (backgroundImage !== undefined) {
            backgroundImage = backgroundImage.split(" ").join("-");
            var divStyle = { backgroundImage: 'url(../../assets/backgrounds/' + backgroundImage + '.jpg)' };
            return (

                <div style={divStyle} class={style.header}  >
                    <button onClick={deleteFunction}>Remove</button>
                    <div class={this.clickable} onClick={cFunction}>
                        <div class={style.city}>{this.props.cityName}</div>
                        <div class={style.conditions}>{this.props.condition}</div>
                        <div class={style.temp}>{this.props.temp}°C</div>
                    </div>
                </div>
            );
        }
    }
}
