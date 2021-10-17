import { h, render, Component } from 'preact';
// import style from './style';
export default class weatherIcon extends Component {

    render() {


        let url = "http://openweathermap.org/img/wn/" + this.props.code + ".png"

        return (
            <img style={"width:25x;height:25px;padding:0px;margin:0px;"} src={url} alt="new" />
        )
    }

}