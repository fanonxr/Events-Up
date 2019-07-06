import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";


export const configureStore = () => {
    // createStore takes in a reducer and store provider args
    const store = createStore(rootReducer);
    return store;

}