import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from "../../app/data/mockApi";

// creating 3 actions
export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event // accessing the event as an object
        }
    }
}

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event
        }
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart())
            let events = await fetchSampleData(); // will store an array of events
            dispatch({ type: FETCH_EVENTS, payload: { events } })
            dispatch(asyncActionFinish())
        } catch (error) {
            console.log("Error: " + error);
            dispatch(asyncActionError())
        }
    }
}