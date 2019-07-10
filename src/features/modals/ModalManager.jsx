import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const modalLookup = {
    TestModal,
    LoginModal,
    RegisterModal
};

const mapState = (state) => ({
    currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
    let renderModal;

    if (currentModal) {
        // if we have our modal open, that will be the component that will be rendered
        const { modalType, modalProps } = currentModal;
        const ModalComponent = modalLookup[modalType]; //

        renderModal = <ModalComponent {...modalProps} />
    }

    return (
        <span>{renderModal}</span>
    )
}

export default connect(mapState)(ModalManager);
