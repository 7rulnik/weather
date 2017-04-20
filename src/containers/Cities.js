import React, { Component } from 'react';
import { connect } from 'react-redux';
import City from './../components/City';
import Loader from './../components/Loader';
import Error from './../components/Error';
import { addCity, removeCity, getCityWeather } from '../AC/cities';

class Cities extends Component {
    state = {
        text: '',
        err: '',
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
            this.state.err
                ? <Error errorText={this.state.err}/>
                : <div>
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
                        placeholder='Введите название города'/>
                    {this.props.cities.citiesList && this.props.cities.citiesList.length
                        ? this.props.cities.citiesList.map((city, i) => {
                            return <City
                                key={i}
                                city={city}
                                getCityWeather={this.props.getCityWeather}
                                removeCity={this.handleRemoveClick}/>;
                        }) : null}
                </div>
        );
    }

    createAutocomplete() {
        var self = this;
        var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));

        this.setState({currentCityLoaded: true});

        google.maps.event.addListener(places, 'place_changed', function() {
            var place = places.getPlace();
            var address = place.formatted_address;
            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();

            self.handleAddClick(address, lat, lng);

            self.setState({text: ''});
        });
    }

    componentDidMount() {
        var self = this;
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            self.props.getCityWeather(latitude, longitude);
            self.createAutocomplete();
        }

        function error(err) {
            self.setState({err: err.message});
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
