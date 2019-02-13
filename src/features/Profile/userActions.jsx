// import moment from 'moment';
import cuid from 'cuid';

// import firebase from '../../app/config/firebase';

export const updateProfile = user => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  console.log('updatedUser', updatedUser);

  try {
    await firebase.updateProfile(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  console.log(imageName, user, path, options);

  try {
    // dispatch(asyncActionStart());
    // upload the file to fb storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    console.log('uploadedFile:', uploadedFile);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    console.log('downloadURL:', downloadURL);
    // get the userdoc from firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // add the new photo to photos collection
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    // dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    // dispatch(asyncActionError());
    throw new Error('Problem uploading photo');
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  let userDocRef = firestore.collection('users').doc(user.uid);
  console.log('userDoc:', userDocRef)
  console.log(photo);

  try {
    let batch = firestore.batch();
    await batch.update(userDocRef, {
      photoURL: photo.url
    });
    console.log('batch', batch);
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error('Problem deleting the photo');
  }
};
