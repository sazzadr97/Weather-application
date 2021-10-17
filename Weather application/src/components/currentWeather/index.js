// import preact
import { h, render, Component } from 'preact';
import style from './style';
export default class cityWeather extends Component {

    // rendering a function when the button is clicked
    render() {

        let cFunction = this.props.clickFunction;
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
            if (this.props.link == "no") {
                return (

                    <div style={divStyle} class={style.headerNoHover} onClick={cFunction} >
                        <div class={style.centerAlign}>
                            <div class={style.city}>{this.props.cityName}</div>
                            <div class={style.conditions}>{this.props.condition}</div>
                            <div class={style.temp}>{this.props.temp}°C</div>
                        </div>
                    </div>
                );
            }
            else {
                return (

                    <div style={divStyle} class={style.header} onClick={cFunction} >
                        <div class={style.centerAlign}>
                            <div class={style.city}>{this.props.cityName}</div>
                            <div class={style.conditions}>{this.props.condition}</div>
                            <div class={style.temp}>{this.props.temp}°C</div>
                        </div>
                    </div>
                );
            }


            
        }

        // while (backgroundImage == null){console.log("sldkfmsldkmf")}



    }
}
