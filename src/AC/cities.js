import axios from 'axios';
import { API_URL, API_KEY, ADD_CITY, REMOVE_CITY, CURRENT_CITY_START, CURRENT_CITY_OK, CURRENT_CITY_ERROR,
        CITY_START, CITY_OK, CITY_ERROR} from '../constants';

export function getCityWeather(lat, lng, id) {
    console.log(id);
    let START = CURRENT_CITY_START;
    let OK = CURRENT_CITY_OK;
    let ERROR = CURRENT_CITY_ERROR;
    if (id) {
        START = CITY_START;
        OK = CITY_OK;
        ERROR = CITY_ERROR;
    }
    return (dispatch, state) => {
        dispatch({
            type: START
        })

        axios.get(`${API_URL}?lat=${lat}&lon=${lng}&appid=e539b3dcdce62f43d0c9eac4ff2b6ab4`)
        .then(function(response) {
            const { name, weather } = response.data;
            dispatch({
                type: OK,
                payload: {
                    id,
                    name,
                    weather,
                    lat,
                    lng
                }
            });
        })
        .catch(function(error) {
            console.log(error)
            dispatch({
                type: ERROR
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
