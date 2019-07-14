import { toastr } from "react-redux-toastr";

export const updateProfile = (user) =>
    async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        // send up the need props - updatedUser will contain all of the needed
        const { isLoaded, isEmpty, ...updatedUser } = user;
        try {
            // running it against the firebase instance instead of the user objs
            await firebase.updateProfile(updatedUser); // updating the profile in firestore
            toastr.success('Success', 'Your profile has been updated');
        } catch (error) {
            console.log('Error: ' + error)
        }
    }