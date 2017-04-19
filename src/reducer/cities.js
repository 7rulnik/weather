import { ADD_CITY, REMOVE_CITY, SELECT_CITY, CURRENT_CITY_OK } from '../constants';
import _ from 'lodash';

const defaultCities = JSON.parse(localStorage.getItem('cities')) || [];



export default (cities = defaultCities, action) => {

    const { type } = action;
    // if (action.payload) {
    //     var { type, randomId, payload: {title} } = action;
    // }


    switch (type) {
        case CURRENT_CITY_OK:
            console.log(action);
            console.log(cities);
            return Object.assign({}, {currentCity: action.payload}, {citiesList: cities});

        case SELECT_CITY:
            return cities;
            return _.slice(action.tasks);

        case ADD_CITY:
            return cities;
            return _.concat(tasks, [{id: randomId, value}])

        case REMOVE_CITY:
            return cities;
            return action.tasks.filter(function (item) {
                return item.id !== id
            });
    }

    return cities
}