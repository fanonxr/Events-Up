import { createReducer } from '../../app/common/util/reducerUtils';
import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';
const initialState = null; // modal will be unopened

const openModal = (state, payload) => {
    const { modalType, modalProps } = payload;
    return { modalType, modalProps };
}

const closeModal = (state) => {
    return null;
}


export default createReducer(initialState, {
    [MODAL_OPEN]: openModal,
    [MODAL_CLOSE]: closeModal
});