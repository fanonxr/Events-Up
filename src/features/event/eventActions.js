import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstants";

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