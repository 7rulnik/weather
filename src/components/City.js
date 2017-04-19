import React, { Component, PropTypes } from 'react';
import Weather from './../components/Weather';
import Loader from './../components/Loader';
import './City.styl';

class City extends Component {
    state = {
        open: false
    }

    getCityWeather = (e) => {
        if (!this.props.current && !this.state.open) {
            this.props.getCityWeather(this.props.city.lat, this.props.city.lng, this.props.city.id);
        }
        this.setState({open: !this.state.open });
    }

    handleRemoveClick = (e) => {
        this.props.removeCity(this.props.city.id);
    }

    render() {
        let isOpen;
        if (this.props.current) {
            isOpen = true;
        } else if (this.props.city.showWeather && this.state.open){
            isOpen = true;
        } else {
            isOpen = false;
        }
        return (
            <div className='city-item'>
                <div className='city-name' onClick={this.getCityWeather}>{this.props.city.name}
                    {this.props.current ? null : <span className='city-remove' onClick={this.handleRemoveClick}>×</span>}
                </div>
                {isOpen
                    ? <Weather weather ={this.props.city.weather} />
                    : <Loader />
                }
            </div>
        );
    }
}

export default City;
