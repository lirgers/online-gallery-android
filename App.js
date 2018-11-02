import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './src/Reducer'
import Navigator from './src/components/Navigator'
import Actions from './src/Actions'

const { fetchData } = Actions;
const store = createStore(reducer, applyMiddleware(thunk));
fetchData()(store.dispatch);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
