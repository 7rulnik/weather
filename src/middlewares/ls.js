import { SELECT_CITY, ADD_CITY, REMOVE_CITY } from '../constants';

export default store => next => action => {
    if (action.type === SELECT_CITY) {
        const { ...rest} = action;

        const cities = JSON.parse(localStorage.getItem('cities'));

        return next({
            ...rest,
            cities
        });
    }

    if (action.type === REMOVE_CITY) {
        const {payload: {id}} = action;
        const { ...rest} = action;
        let cities = {};
        if (localStorage.getItem('cities')) {
            cities = JSON.parse(localStorage.getItem('cities'));
        }

        cities = cities.filter(function(item) {
            return item.id !== id;
        })

        localStorage.setItem('cities', JSON.stringify(cities));

        return next({
            ...rest,
            cities
        });
    }

    if (action.type === ADD_CITY) {
        const {randomId, payload: {name, lat, lng}} = action;
        let cities = {};
        if (localStorage.getItem('cities')) {
            cities = JSON.parse(localStorage.getItem('cities'));
        }

        if (!cities.length) {
            cities = [{id: randomId, name, lat, lng}];

        } else {
            cities.push({id: randomId, name, lat, lng});
        }
        localStorage.setItem('cities', JSON.stringify(cities));
    }
    return next(action);
}