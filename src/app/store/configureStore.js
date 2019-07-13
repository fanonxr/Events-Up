import { createStore, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import {reduxFirestore, getFirestore} from 'redux-firestore'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import firebase from '../config/firebase';

// setting up firebase with redux
const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFireStoreForProfile: true, // when user registers - store in firestore
    updateProfileOnLogin: false
};

export const configureStore = () => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

    const composedEnhancer = composeWithDevTools(
        // applyinh middleware
        applyMiddleware(...middlewares), // gives us access to redux thunk
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase));


    // createStore takes in a reducer and store provider args
    const store = createStore(rootReducer, composedEnhancer);

    return store;
}