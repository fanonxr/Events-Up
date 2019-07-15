import {
    toastr
} from "react-redux-toastr";
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from '../async/asyncActions';
import cuid from 'cuid';

export const updateProfile = (user) =>
    async (dispatch, getState, {
        getFirebase
    }) => {
        const firebase = getFirebase();
        // send up the need props - updatedUser will contain all of the needed
        const {
            isLoaded,
            isEmpty,
            ...updatedUser
        } = user;
        try {
            // running it against the firebase instance instead of the user objs
            await firebase.updateProfile(updatedUser); // updating the profile in firestore
            toastr.success('Success', 'Your profile has been updated');
        } catch (error) {
            console.log('Error: ' + error)
        }
    }

// allow to upload new image to the doc
export const uploadProfileImage = (file, fileName) =>
    async (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const imageName = cuid();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName
        };

        // upload this specific file
        try {
            dispatch(asyncActionStart())
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options)

            // get the URL from the uploaded image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

            // get the user document from firestore
            let userDoc = await firestore.get(`users/${user.uid}`)

            // check if user has photo, if not, update profile
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                // adding to the auth prop of firestore
                await user.updateProfile({
                    photoURL: downloadURL
                });
            }

            // create a sub collection for each specific user
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{
                    collection: 'photos'
                }]
            }, {
                name: imageName,
                url: downloadURL
            })
            dispatch(asyncActionFinish())
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError);
        }
    }

export const deletePhoto = (photo) =>
    async (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collections: 'users',
                doc: user.uid,
                subcollections: [{
                    collection: 'photos',
                    doc: photo.id
                }]
            })
        } catch (error) {
            console.log("error: " + error);
            throw new Error('Problem deleting the selected photo')
        }
    }

export const setMainPhoto = (photo) =>
    async (dispatch, getState, {
        getFirebase
    }) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoUrl: photo.url
            })
        } catch (error) {
            console.log(error);
            throw new Error('Problem setting the profile picture')
        }
    }