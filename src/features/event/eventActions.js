import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";

// creating 3 actions
export const createEvent = (event) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_EVENT,
                payload: {
                    event // accessing the event as an object
                }
            });
            toastr.success('Success!', 'Event has been created');
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
        }
    }
}

export const updateEvent = (event) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_EVENT,
                payload: {
                    event // accessing the event as an object
                }
            });
            toastr.success('Success!', 'Event has been created');
        } catch (error) {
            toastr.error('Oops', 'Something went wrong')
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