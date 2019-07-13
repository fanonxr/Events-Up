import {
    createReducer
} from '../../app/common/util/reducerUtils';
import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    FETCH_EVENTS
} from './eventConstants';

// set the inital state to the state of  when the app loads
const initialState = []

// create the reducer functions
const createEvent = (state, payload) => {
    // create a new array based on whats spread within our state
    return [...state, payload.event];
}

// update the event
const updateEvent = (state, payload) => {
    // return all the events that do not match the id thats passed into the payload
    return [
        ...state.filter(event => event.id !== payload.event.id), payload.event
    ]
}

const deleteEvent = (state, payload) => {
    return [
        ...state.filter(event => event.id !== payload.eventId)
    ]
}

// reducer to fetch events
const fetchEvents = (state, payload) => {
    return payload.events // events coming in as an array - which will overwrite the intial state array
}

export default createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent,
    [FETCH_EVENTS]: fetchEvents
});