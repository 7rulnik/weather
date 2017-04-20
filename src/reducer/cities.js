import { ADD_CITY, REMOVE_CITY, CURRENT_CITY_START, CURRENT_CITY_OK, CURRENT_CITY_ERROR,
    CITY_START, CITY_OK, CITY_ERROR } from '../constants';

const defaultCities = JSON.parse(localStorage.getItem('cities')) || [];

export default (cities = defaultCities, action) => {

    const { type, payload, randomId } = action;

    if (payload) {
        var { id, name, lat, lng, weather } = payload;
    }

    switch (type) {
        case CURRENT_CITY_START:
            return Object.assign({}, {currentCity: false}, {citiesList: cities});

        case CURRENT_CITY_OK:
            return Object.assign({}, {currentCity: payload}, {citiesList: cities.citiesList});

        case CITY_START:
            cities.citiesList.forEach(function(item) {
                if (item.id === id) {
                    item.showCityLoader = true;
                }
            })
            return Object.assign({}, cities);

        case CITY_OK:
            cities.citiesList.forEach(function(item) {
                if (item.id === id) {
                    item.showWeather = true;
                    item.weather = weather;
                } else {
                    item.showWeather = false;
                }
                item.showCityLoader = false;
            })
            return Object.assign({}, cities);

        case ADD_CITY:
            const city = {
                id: randomId,
                name,
                lat,
                lng
            }
            cities.citiesList.push(city);
            return Object.assign({}, cities);

        case REMOVE_CITY:
            cities.citiesList = cities.citiesList.filter(function(item) {
                return item.id !== id;
            });
            return Object.assign({}, cities);
    }

    return cities;
};
