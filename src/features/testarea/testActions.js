// actions are objects and must cotain a type

import { INCREMENT_COUNTER } from './testConstants';
import { DECREMENT_COUNTER } from './testConstants';

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

