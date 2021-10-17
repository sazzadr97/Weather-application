// import preact
import { h, render, Component } from 'preact';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import search bar component
import SearchBar from '../searchBar';
// import title component
import Title from '../title';
// import componenet to show hourly details
import Hourly from '../hourly';
// import city weather component
import CityWeather from '../currentWeather';
// import city weather component for search bar
import SearchCityWeather from '../searchCity';
// import favourite component
import Favourite from '../favourite';
// import weather icon component
import WeatherIcon from '../weatherIcon';
// import daily componenet
import Daily from '../daily';


export default class Iphone extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {

		super(props);
		// get coordinates
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.setCoordinates);

		} else {
			console.log("Filaed");
		}

		// API key
		this.state.apiKey = "2c4d6bc378426fc51fcb96e40d563a3f";
		// temperature state
		this.state.temp = "";
		// button display state
		this.state.display = "home";
		// longitude
		this.state.lon = "";
		// latitude
		this.state.lat = "";
		// default favourite locations
		this.state.favs = ["Brighton", "London", "Paris"];
		// state to store favourite weather locations
		this.state.favsWeatherData = [];
		// state to check if current location weather data retrieved 
		this.state.foundCurrentLocation = false;
		// state to check if search location weather data retrieved
		this.state.foundSearchLocation = false;
		// state to check if weather data retrieved for favourite locations
		this.state.favouriteDataRetrieved = false;
		// state to check is details retrieved
		this.state.retrievedDetails = false;
		// state to store weather data for details
		this.state.retrieved = [];

	}


	// set coordinates to states
	setCoordinates = (position) => {
		// return "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
		this.setState({
			lat: position.coords.latitude,
			lon: position.coords.longitude

		});
		// console.log("jdsnfkdsjfnkdfjn")

	}




	// the main render method for the iphone component
	render() {



		// if display state is home
		if (this.state.display == "home") {


			// fetch weather data for current location if not already done so
			if (!this.state.foundCurrentLocation && this.state.lon != "" && this.state.lat != "") {

				this.fetchCurrentLocationWeatherData();
				console.log("Here");
			}
			return (


				<div class={style.container}>
					{
						// navigation 
					}
					<div class={style_iphone.nav}>


						{<Button text={"Home"} clickFunction={this.changeStateToHome}></Button>}

						{<Button text={"Favourites"} clickFunction={this.changeStateToFavourites}></Button>}
						{<Button text={"Search"} clickFunction={this.changeStateToSearch}></Button>}
					</div>

					{
						// title and current location weather
					}
					<div >
						<Title text="Current Location" />

						<CityWeather cityName={this.state.locate} condition={this.state.cond} temp={this.state.temp} clickFunction={() => this.changeStateToDetails(this.state.locate)} />

					</div>
				</div>

			);
		}

		// if state is favourites
		else if (this.state.display == "favourites") {



			// fetch weather details for favourite locations
			let list = this.state.favsWeatherData;
			let list2 = this.state.favs;
			if (list2.length != 0) {
				if (list.length == 0 || (list.length != list2.length)) {
					// console.log("fetching");

					for (let index = 0; index < list2.length; index++) {
						if (!this.state.retrieved.includes(list2[index])) {
							this.fetchFavouriteLocationData(list2[index]);
							this.state.retrieved.push(list2[index]);
							// console.log(list2[index])
						}
					}
				}
			}
			else {
				alert("No Favourite Locations");
			}

			// array to store components for favourites
			const favs = [];

			// create component for each weather component
			for (let index = 0; index < list.length; index++) {
				// console.log("Second List" + list2[index]);
				favs.push(<Favourite cityName={list[index]['0']} condition={list[index]['1']} temp={list[index]['2']} clickFunction={() => this.changeStateToDetails(list[index]['0'])} deleteFunction={() => this.deleteFavourite(list[index]['0'])} />)
			}


			return (


				<div class={style.container} >
					<div class={style_iphone.nav}>
						{<Button class={style_iphone.button} text={"Home"} clickFunction={this.changeStateToHome}></Button>}
						{<Button class={style_iphone.button} text={"Favourites"} clickFunction={this.changeStateToFavourites}></Button>}
						{<Button class={style_iphone.button} text={"Search"} clickFunction={this.changeStateToSearch}></Button>}
					</div>

					<Title text="Favourites" />

					<div>
						{favs}
					</div>


				</div>
			);
		}

		// if state is details
		else if (this.state.display == "details") {
			// More Details Page

			// if data retrieved
			if (this.state.retrievedDetails == true) {
				return (

					<div class={style.container} >

						<div class={style_iphone.nav}>
							{<Button class={style_iphone.button} text={"Home"} clickFunction={this.changeStateToHome}></Button>}
							{<Button class={style_iphone.button} text={"Favourites"} clickFunction={this.changeStateToFavourites}></Button>}
							{<Button class={style_iphone.button} text={"Search"} clickFunction={this.changeStateToSearch}></Button>}
						</div>

						<div class={style.locationContainer}>

							<CityWeather cityName={this.state.detailsLocation} condition={this.state.detailsCond} temp={this.state.detailsTemp} link="no" />


						</div>

						<div class={style.subContainer}>
							<div class={style.table}>
								<Hourly time={this.state.detailsHour1Time} icon={<WeatherIcon code={this.state.detailsHour1Icon} />} temp={this.state.detailsHour1Temp} />
								<Hourly time={this.state.detailsHour2Time} icon={<WeatherIcon code={this.state.detailsHour2Icon} />} temp={this.state.detailsHour2Temp} />
								<Hourly time={this.state.detailsHour3Time} icon={<WeatherIcon code={this.state.detailsHour3Icon} />} temp={this.state.detailsHour3Temp} />
								<Hourly time={this.state.detailsHour4Time} icon={<WeatherIcon code={this.state.detailsHour4Icon} />} temp={this.state.detailsHour4Temp} border="no" />
							</div>
						</div>


						<div class={style.subContainer}>
							<div class={style.table}>
								{/* {console.log(this.state.detailsDaily[0][2])} */}
								<Daily data={this.state.detailsDaily} />
							</div>

						</div>
					</div>
				);
			}

		}

		// if state is search
		else if (this.state.display == "search") {


			// if already searched
			if (this.state.foundSearchLocation == true) {
				return (

					<div class={style.container} >
						<div class={style_iphone.nav}>
							{<Button class={style_iphone.button} text={"Home"} clickFunction={this.changeStateToHome}></Button>}
							{<Button class={style_iphone.button} text={"Favourites"} clickFunction={this.changeStateToFavourites}></Button>}
							{<Button class={style_iphone.button} text={"Search"} clickFunction={this.changeStateToSearch}></Button>}
						</div>
						<div>
							<SearchBar onKeyPressed={(e) => this.keyPressed(e)} />

							<SearchCityWeather cityName={this.state.searchLocation} condition={this.state.searchCond} temp={this.state.searchTemp} addFunction={this.addToFavourite} />

						</div>
						<div class={style.searchSubContainer}>

							<div class={style.table}>

								<Hourly time={this.state.hour1Time} icon={<WeatherIcon code={this.state.hour1Icon} />} temp={this.state.hour1Temp} />
								<Hourly time={this.state.hour2Time} icon={<WeatherIcon code={this.state.hour2Icon} />} temp={this.state.hour2Temp} />
								<Hourly time={this.state.hour3Time} icon={<WeatherIcon code={this.state.hour3Icon} />} temp={this.state.hour3Temp} />
								<Hourly time={this.state.hour4Time} icon={<WeatherIcon code={this.state.hour4Icon} />} temp={this.state.hour4Temp} border="no" />

							</div>
						</div>

					</div>

				)
			}
			// if not searched
			else {
				return (
					<div class={style.container} >
						<div class={style_iphone.nav}>
							{<Button class={style_iphone.button} text={"Home"} clickFunction={this.changeStateToHome}></Button>}
							{<Button class={style_iphone.button} text={"Favourites"} clickFunction={this.changeStateToFavourites}></Button>}
							{<Button class={style_iphone.button} text={"Search"} clickFunction={this.changeStateToSearch}></Button>}
						</div>
						<div>
							<SearchBar onKeyPressed={(e) => this.keyPressed(e)} />

						</div>
					</div>
				)
			}

		}
	}





	// event handler for when enter key is pressed on search page
	keyPressed = (event) => {
		if (event.key === "Enter") {

			if (event.target.value != "") {

				this.fetchSearchLocationWeatherData(event.target.value);
			}

		}

	}

	// change display state to home
	changeStateToHome = () => {

		this.setState({ display: "home" });

	}

	// change display state to favourites
	changeStateToFavourites = () => {
		this.setState({ display: "favourites" })
	}

	// change display state to details and fetch weather data for location
	changeStateToDetails = (location) => {

		if (this.state.detailsLocation != location) {

			this.fetchDetailsWeatherData(location);
		}

		this.setState({
			display: "details",
			detailsLocation: location
		});




	}

	// change display state to search
	changeStateToSearch = () => {

		this.setState({ display: "search" })
	}

	// function to add to favourites
	addToFavourite = () => {


		let list = this.state.favs;
		// if there is space in the favourites array
		if (list.length < 3) {

			let exists = false;
			// check if location does not already exist in favourites
			for (let index = 0; index < list.length; index++) {
				if (list[index] == this.state.searchLocation) {
					exists = true;
				}
			}

			// if is does not already exist
			if (!exists) {

				// Favourite added
				this.setState(prevState => ({
					favs: [...prevState.favs, this.state.searchLocation]

				}))
				{ alert("Favourite Added") };
				// console.log(this.state.favs);

			}

			else {
				{ alert("Favourite Already Added") };
			}
		}
		else {
			{ alert("No Space") };
		}

	}

	// function to delete favourite
	deleteFavourite = (location) => {


		let favLocations = this.state.favs;
		// loop through array, find index of location to remove and splice out of array
		for (let index = 0; index < favLocations.length; index++) {
			if (favLocations[index] == location) {
				favLocations.splice(index, 1);

			}

		}

		// reset states
		this.setState({
			favs: favLocations,
			retrieved: [],
			favsWeatherData: []
		})

		{ alert("Favourite Removed") };

	}

	// format temp value to whole number
	formatTemp = (temp) => {
		return temp.toFixed(0);
	}

	// format time
	formatTime = (time) => {

		let date = new Date(time);
		return date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
	}

	// format date
	formatDate = (dateToFormat) => {
		let date = new Date(dateToFormat);

		return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
	}


	// fetch weather data of searched location
	fetchSearchLocationWeatherData = (location) => {


		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json

		var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&APPID=" + this.state.apiKey + "&cnt=5";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseSearchLocationResponse,

			error: (req, err) => {
				this.setState({
					foundSearchLocation: false
				})
				console.log('API call failed ' + err);

			}
		})

	}

	// parse data of searched location
	parseSearchLocationResponse = (parsed_json) => {


		var location = parsed_json['city']['name'];
		var temp_c = parsed_json['list']['0']['main']['temp'];
		var conditions = parsed_json['list']['0']['weather']['0']['description'];


		// set states for fields so they could be rendered later on
		this.setState({
			searchLocation: location,
			searchTemp: this.formatTemp(temp_c),
			searchCond: conditions,

			hour1Time: this.formatTime(parsed_json['list']['1']['dt_txt']),
			hour1Icon: parsed_json['list']['1']['weather']['0']['icon'],
			hour1Temp: this.formatTemp(parsed_json['list']['1']['main']['temp']),

			hour2Time: this.formatTime(parsed_json['list']['2']['dt_txt']),
			hour2Icon: parsed_json['list']['2']['weather']['0']['icon'],
			hour2Temp: this.formatTemp(parsed_json['list']['2']['main']['temp']),

			hour3Time: this.formatTime(parsed_json['list']['3']['dt_txt']),
			hour3Icon: parsed_json['list']['3']['weather']['0']['icon'],
			hour3Temp: this.formatTemp(parsed_json['list']['3']['main']['temp']),

			hour4Time: this.formatTime(parsed_json['list']['4']['dt_txt']),
			hour4Icon: parsed_json['list']['4']['weather']['0']['icon'],
			hour4Temp: this.formatTemp(parsed_json['list']['4']['main']['temp']),
			foundSearchLocation: true
		});




	}



	// fetch weather data of current location
	fetchCurrentLocationWeatherData = () => {




		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&units=metric&APPID=" + this.state.apiKey;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseCurrentLocationResponse,
			error: function (req, err) { console.log('API call failed ' + err); }
		})



	}



	// parse weather data of current location
	parseCurrentLocationResponse = (parsed_json) => {



		var location = parsed_json['name'];

		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];


		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: this.formatTemp(temp_c),
			cond: conditions,
			foundCurrentLocation: true
		});

		// return location;


	}

	// fetch weather data for favourite locations
	fetchFavouriteLocationData = (location) => {


		let weatherData = this.state.favsWeatherData;
		if (!weatherData.some(row => row.includes(location))) {
			var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&APPID=" + this.state.apiKey;
			$.ajax({
				url: url,
				dataType: "jsonp",
				success: this.parseFavouriteLocationResponse,
				error: function (req, err) { console.log('API call failed ' + err); }
			})
		}



	}


	// parse weather data of favourite locations
	parseFavouriteLocationResponse = (parsed_json) => {

		var location = parsed_json['name'];


		let list1 = this.state.favs;
		let list2 = this.state.favsWeatherData;

		if (list1.length != list2.length) {

			var temp_c = this.formatTemp(parsed_json['main']['temp']);
			var conditions = parsed_json['weather']['0']['description'];

			let list = [location, conditions, temp_c];

			if (this.state.favsWeatherData.length < 3) {
				this.setState(prevState => ({
					favsWeatherData: [...prevState.favsWeatherData, list]
				}))


			}
		}




	}

	// fetch weather data for details page
	fetchDetailsWeatherData = (location) => {


		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json

		var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=metric&APPID=" + this.state.apiKey;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success: this.parseDetailsResponse,

			error: (req, err) => {

				console.log('API call failed ' + err);

			}

		})

	}

	// parse weather details 
	parseDetailsResponse = (parsed_json) => {


		var location = parsed_json['city']['name'];

		// current weather
		var temp_c = parsed_json['list']['0']['main']['temp'];
		var conditions = parsed_json['list']['0']['weather']['0']['description'];

		// all details
		let details = [];

		// temporary array to store data for each day
		let dayDetails = [];

		// data to deduce icon
		let conditionsIconList = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d']
		let conditionsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];

		// last data checked from json
		let lastDate = "";

		// length of json
		let jsonLength = parsed_json['list'].length;

		// index of list from json
		let index = 0;

		// array to hold wind speeds before calculating average
		let windSpeed = [];

		// if not over length of json or data for 4 days is already retrieved
		while (index < jsonLength && details.length < 4) {
			// if the last date checked is not equal to current date being checked
			if (lastDate != this.formatDate(parsed_json['list'][index]['dt_txt'])) {
				// get next date from json
				lastDate = this.formatDate(parsed_json['list'][index]['dt_txt']);

				// calculate average speed speed
				let sum = 0;
				for (let index = 0; index < windSpeed.length; index++) {
					sum += windSpeed[index];
				}

				// if data retrieved for date add to collection of data
				if (dayDetails.length > 0) {
					let highestIdx = 0;
					for (let idx = 0; idx < conditionsCount.length; idx++) {
						if (conditionsCount[idx] > highestIdx) {
							highestIdx = idx
						}
					}
					dayDetails.push(this.formatTemp((sum / windSpeed.length) * 2.237));
					dayDetails.push(conditionsIconList[highestIdx]);
					conditions
					details.push(dayDetails);
				}

				// reset variables
				conditionsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				dayDetails = [lastDate, 100, 0];

			}

			// if min temp lower than that which is store
			if (parsed_json['list'][index]['main']['temp_min'] < dayDetails[1]) {
				dayDetails[1] = this.formatTemp(parsed_json['list'][index]['main']['temp_min']);
			}

			// if max temp lower than that which is store
			if (parsed_json['list'][index]['main']['temp_max'] > dayDetails[2]) {
				dayDetails[2] = this.formatTemp(parsed_json['list'][index]['main']['temp_max']);
			}

			// switch statement to deduce whihc icon to use
			switch (parsed_json['list'][index]['weather']['0']['description']) {
				case 'clear sky':
					conditionsCount[0] += 1;
					console.log(0);
					console.log(conditionsCount)
					break;
				case 'few clouds':
					conditionsCount[1] += 1;
					console.log(1);
					console.log(conditionsCount)
					break;
				case 'scattered clouds':
					conditionsCount[2] += 1;
					console.log(2);
					console.log(conditionsCount)
					break;
				case 'overcast clouds':
					conditionsCount[3] += 1;
					console.log(3);
					console.log(conditionsCount)
					break;
				case 'broken clouds':
					conditionsCount[3] += 1;
					console.log(3);
					console.log(conditionsCount)
					break;
				case 'shower rain':
					conditionsCount[4] += 1;
					console.log(4);
					console.log(conditionsCount)
					break;
				case 'light rain':
					conditionsCount[5] += 1;
					console.log(5);
					console.log(conditionsCount)
					break;
				case 'thunderstorm':
					conditionsCount[6] += 1;
					console.log(6);
					console.log(conditionsCount)
					break;
				case 'snow':
					conditionsCount[7] += 1;
					console.log(7);
					console.log(conditionsCount)
					break;
				case 'mist':
					conditionsCount[8] += 1;
					console.log(8);
					console.log(conditionsCount)
					break;

			}

			// add wind speed to array for average calculation
			windSpeed.push(parsed_json['list'][index]['wind']['speed']);

			// increment index
			index++;
		}

		// set states for fields so they could be rendered later on
		this.setState({
			detailsLocation: location,
			detailsTemp: this.formatTemp(temp_c),
			detailsCond: conditions,

			detailsHour1Time: this.formatTime(parsed_json['list']['1']['dt_txt']),
			detailsHour1Icon: parsed_json['list']['1']['weather']['0']['icon'],
			detailsHour1Temp: this.formatTemp(parsed_json['list']['1']['main']['temp']),

			detailsHour2Time: this.formatTime(parsed_json['list']['2']['dt_txt']),
			detailsHour2Icon: parsed_json['list']['2']['weather']['0']['icon'],
			detailsHour2Temp: this.formatTemp(parsed_json['list']['2']['main']['temp']),

			detailsHour3Time: this.formatTime(parsed_json['list']['3']['dt_txt']),
			detailsHour3Icon: parsed_json['list']['3']['weather']['0']['icon'],
			detailsHour3Temp: this.formatTemp(parsed_json['list']['3']['main']['temp']),

			detailsHour4Time: this.formatTime(parsed_json['list']['4']['dt_txt']),
			detailsHour4Icon: parsed_json['list']['4']['weather']['0']['icon'],
			detailsHour4Temp: this.formatTemp(parsed_json['list']['4']['main']['temp']),

			detailsDaily: details,
			retrievedDetails: true

		});


	}


}

