import axios from 'axios';
import { API_URL, ADD_CITY, REMOVE_CITY, CURRENT_CITY_OK, CURRENT_CITY_ERROR } from '../constants';

export function getCityWeather(lat, lng) {
    return (dispatch, state) => {
        dispatch({
            type: 'start'
        })

        axios.get(`${API_URL}?lat=${lat}&lon=${lng}&appid=e539b3dcdce62f43d0c9eac4ff2b6ab4`)
        .then(function(response) {
            const { name, weather } = response.data;
            dispatch({
                type: CURRENT_CITY_OK,
                payload: {
                    name,
                    weather,
                    lat,
                    lng
                }
            });
        })
        .catch(function(error) {
            dispatch({
                type: CURRENT_CITY_ERROR
            });
        });
    };
}

export function addCity(name, lat, lng) {
    return {
        type: ADD_CITY,
        payload: {
            name,
            lat,
            lng
        }
    };
}

export function removeCity(id) {
    return {
        type: REMOVE_CITY,
        payload: { id }
    };
}
