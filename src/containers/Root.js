import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Cities from './Cities';
import store from '../store';
import './Root.styl';

class RootContainer extends Component {
    static propTypes = {

    };

    render() {
        return (
            <Provider store = {store}>
                <Cities />
            </Provider>
        );
    }
}

export default RootContainer;
