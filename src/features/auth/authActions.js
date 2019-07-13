import { SubmissionError, reset } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';

export const login = (creds) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {
            console.log("Error: " + error);
            throw new SubmissionError({
                _error: error.message
            })
        }
    };
};

export const registerUser = user =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            // get user information when signing in
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            console.log(createdUser);

            // updatining the auth profile - not dealing with auth in firebase, but dealing with user in firestore!
            await createdUser.user.updateProfile({
                displayName: user.displayName
            });

            let newUser = {
                displayName: user.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            };

            // at the new user and props to firestore db
            await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });

            dispatch(closeModal());

        } catch (error) {
            console.log("Error: " + error);
            throw new SubmissionError({
                _error: error.message
            });
        }
    };

// adding facebook login/regiser functionality
export const socialLogin = (selectedProvidedr) =>
    async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            dispatch(closeModal());
            // get the needed info from the user obj
            const user = await firebase.login({
                provider: selectedProvidedr,
                type: 'popup'
            })

            // check to make sure its the first time the user has signed up
            if (user.addtionalUserInfo.isNewUser) {
                // had the spefici props from user profile to the firestore database
                await firestore.set(`users/${user.user.uid}`, {
                    displayName: user.profile.displayName,
                    photoURL: user.profile.avatarUrl,
                    createdAt: firestore.FieldValue.serverTimestamp()
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

export const updatePassword = (creds) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;

        try {
            // firebase method to update the password
            await user.updatePassword(creds.newPassword1);
            // reset form
            await dispatch(reset('account'));
            toastr.success('Success', 'Your password has been updated!');
        } catch (error) {
            throw new SubmissionError({
                _error: error.message
            })
        }
    }

