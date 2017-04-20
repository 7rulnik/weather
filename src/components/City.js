import React, { Component } from 'react';
import Weather from './../components/Weather';
import './City.styl';

class City extends Component {
    state = {
        open: false
    }

    getCityWeather = (e) => {
        const { getCityWeather, city: {lat, lng, id} } = this.props;
        if (!this.props.current && !this.state.open) {
            getCityWeather(lat, lng, id);
        }
        this.setState({open: false });
    }

    handleRemoveClick = (e) => {
        e.stopPropagation();
        const { removeCity, city: {id} } = this.props;
        removeCity(id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({open: nextProps.city.showWeather });
    }

    render() {
        const isOpen = (this.props.current || (this.props.city.showWeather && this.state.open));
        const isLoading = !this.props.current && this.props.city.showCityLoader;

        return (
            <div className='city-item' onClick={this.getCityWeather}>
                <div className='city-name'><b>{this.props.city.name}</b>
                    {this.props.current ? null : <span className='city-remove' onClick={this.handleRemoveClick}>×</span>}
                </div>

                {isOpen
                    ? <Weather weather={this.props.city.weather} isLoading={isLoading} />
                    : null
                }
            </div>
        );
    }
}

export default City;
