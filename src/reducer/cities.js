import { ADD_CITY, REMOVE_CITY, CURRENT_CITY_START, CURRENT_CITY_OK, CURRENT_CITY_ERROR,
    CITY_START, CITY_OK, CITY_ERROR } from '../constants';
import _ from 'lodash';

const defaultCities = JSON.parse(localStorage.getItem('cities')) || [];



export default (cities = defaultCities, action) => {

    const { type } = action;
    // if (action.payload) {
    //     var { type, randomId, payload: {title} } = action;
    // }

    console.log(action);


    switch (type) {
        case CURRENT_CITY_OK:
            return Object.assign({}, {currentCity: action.payload}, {citiesList: cities});

        case CITY_OK:
            cities.citiesList.forEach(function(item) {
                if (item.id === action.payload.id) {
                    item.showWeather = true;
                    item.weather = action.payload.weather;
                } else {
                    item.showWeather = false;
                }
            })
            return Object.assign({}, cities);

        case ADD_CITY:
            const city = {
                id: action.randomId,
                name: action.payload.name,
                lat: action.payload.lat,
                lng: action.payload.lng
            }
            cities.citiesList.push(city);
            return Object.assign({}, cities);

        case REMOVE_CITY:
            cities.citiesList = cities.citiesList.filter(function(item) {
                return item.id !== action.payload.id;
            });
            return Object.assign({}, cities);
    }

    return cities;
}
