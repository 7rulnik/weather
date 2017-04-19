import { ADD_CITY } from '../constants';

export default store => next => action => {
    if (action.type !== ADD_CITY) return next(action)
    const { ...rest} = action;

    next({
        ...rest,
        randomId: Date.now() + Math.random()
    });
}