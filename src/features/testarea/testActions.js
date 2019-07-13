// actions are objects and must cotain a type

import { INCREMENT_COUNTER } from './testConstants';
import { DECREMENT_COUNTER } from './testConstants';
import { asyncActionFinish } from '../async/asyncActions';
import { ASYNC_ACTION_START } from '../async/asyncConstants';

export const incrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    };
};

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    };
};

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const incrementAsync = (name) => {
    // redux thunk allows you to dispatch actions within actions
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name}) // async reducer will set the flag in stro to true
        await delay(1000)
        dispatch({type: incrementCounter})
        dispatch(asyncActionFinish())
    }
}

export const decrementAsync = (name) => {
    // redux thunk allows you to dispatch actions within actions
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name}) // when the button is click now we have access to the name and props
        await delay(1000)
        dispatch({type: DECREMENT_COUNTER})
        dispatch(asyncActionFinish())
    }
}

