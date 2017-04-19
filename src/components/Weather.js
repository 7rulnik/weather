import React from 'react';

function Weather(props) {
    const { main, description } = props.weather[0];
    return (
        <div>
            <p>{main}</p>
            <b>{description}</b>
        </div>
    );
}

export default Weather;
