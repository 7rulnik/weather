import React, { Component, PropTypes } from 'react';
import Weather from './../components/Weather';
import './City.styl';

class City extends Component {
    static propTypes = {

    };

    state = {
        open: false
    }

    getCityWeather = (e) => {
        if (!this.props.current) {
            this.props.getCityWeather(this.props.city.lat, this.props.city.lng, this.props.city.id);
            this.setState({open: !this.state.open });
        }
    }

    handleRemoveClick = (e) => {
        this.props.removeCity(this.props.city.id);
    }

    render() {
        return (
            <div className='city-item'>
                <div className='city-name' onClick={this.getCityWeather}>{this.props.city.name}
                    {this.props.current ? null : <span className='city-remove' onClick={this.handleRemoveClick}>×</span>}
                </div>
                {this.props.city.showWeather && (this.props.current || this.state.open)
                    ? <Weather weather ={this.props.city.weather} />
                    : null
                }
            </div>
        );
    }
}

export default City;
