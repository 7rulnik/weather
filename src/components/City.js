import React, { Component, PropTypes } from 'react';
import Weather from './../components/Weather';

class City extends Component {
    static propTypes = {

    };

    state = {
        open: false
    }

    toggleCity = (e) => {
        this.setState({open: !this.state.open });
    }

    handleRemoveClick = (e) => {
        this.props.removeCity(this.props.city.id);
    }

    render() {
        console.log(this.props);
        return (
            <div className='city-item'>
                <div className='city-name' onClick={this.toggleCity}>{this.props.city.name}
                    <div className='city-remove' onClick={this.handleRemoveClick}>×</div>
                </div>
                {this.props.current || this.state.open ? <Weather weather ={this.props.city.weather} /> : null}
            </div>
        );
    }
}

export default City;
