import React from 'react';
import Loader from './../components/Loader';

function Weather(props) {
    const { main, description } = props.weather[0];
    return (
        props.isLoading ? <Loader /> : <div className='city-weather'>Погода: <b>{main}</b> ({description})</div>
    );
}

export default Weather;
