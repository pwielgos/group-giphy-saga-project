import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, actionChannel } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
    yield takeEvery('GIPHY_SEARCH', getSearch);
    
}

function* getSearch(){
    console.log('in saga giphy search');
    let response = yield axios.get('/api/search');
    yield put ({type: 'SET_GIPHY', payload: response.data})
    console.log(response.data);
    
}

const giphyReducer = (state = {}, action) => {
    if (action.type === 'SET_GIPHY'){
        console.log('we in set giphy now');
        return 'apples'
    }
    return state
}


const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
    combineReducers({
    giphyReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('react-root'));
