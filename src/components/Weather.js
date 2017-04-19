import React, { PropTypes } from 'react';

function Weather(props) {
    const { main, description } = props.weather[0];
    return (
        <div>
            <p>{main}</p>
            <b>{description}</b>
        </div>
    );
}

// Comment.propTypes = {
//     comment: PropTypes.shape({
//         text: PropTypes.string.isRequired,
//         user: PropTypes.string
//     })
// }

export default Weather