import React, { Component } from 'react';
import { connect } from 'react-redux';
import City from './../components/City';
import Loader from './../components/Loader';
import { addCity, removeCity, getCityWeather } from '../AC/cities';

class Cities extends Component {
    state = {
        text: '',
        currentCityLoaded: false
    }

    handleRemoveClick = (id) => {
        this.props.removeCity(id);
    }

    handleAddClick = (address, lat, lng) => {
        this.props.addCity(address, lat, lng);
    }

    handleText = (e) => {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <div>
                {this.props.cities.currentCity
                    ? <div>
                        <h3>Ваш город</h3>
                        <City city={this.props.cities.currentCity} current={true}/>
                    </div>
                    : <Loader />
                }
                <input
                    id='txtPlaces'
                    value={this.state.text}
                    onChange={this.handleText}
                    className='city-input'
                    placeholder='Выберите город'/>
                {this.props.cities.citiesList && this.props.cities.citiesList.length
                    ? this.props.cities.citiesList.map((city, i) => {
                        return <City
                            key={i}
                            city={city}
                            getCityWeather = {this.props.getCityWeather}
                            removeCity = {this.handleRemoveClick} />;
                }) : null}
            </div>
        );
    }

    componentDidMount() {
        var self = this;
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            self.props.getCityWeather(latitude, longitude);
            self.setState({currentCityLoaded: true});

            var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));

            google.maps.event.addListener(places, 'place_changed', function() {
                var place = places.getPlace();
                var address = place.formatted_address;
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();

                self.handleAddClick(address, lat, lng);

                self.setState({text: ''});
            });
        }

        function error(err) {
            console.log(err);
        }

        if (navigator.geolocation && !this.state.currentCityLoaded) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
}

export default connect((state) => {
    const { cities } = state;
    return { cities };
}, {
    addCity,
    removeCity,
    getCityWeather
})(Cities);
