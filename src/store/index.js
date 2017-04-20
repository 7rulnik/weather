import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducer';
import ls from '../middlewares/ls';
import randomId from '../middlewares/randomId';
import thunk from 'redux-thunk';

const enhancer = compose(
    applyMiddleware(thunk, randomId, ls)
)

const store = createStore(reducer, {}, enhancer);

export default store;
