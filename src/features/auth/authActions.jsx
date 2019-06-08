import { SubmissionError } from 'redux-form';
// import { toastr } from 'react-redux-toastr';

import { closeModal } from '../modals/modalActions';

export const login = creds => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      const login = await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      // console.log("login", login);

      let lastSignInTime = login.user.metadata.lastSignInTime;

      await firestore.update(`users/${login.user.uid}`, { lastSignInTime });

      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    // console.log(createdUser);

    // await createdUser.updateProfile({
    //   displayName: user.displayName
    // });

    let newUser = {
      displayName: user.displayName,
      dateOfBirth: user.dateOfBirth.toDate(),
      gender: user.gender,
      city: user.city,
      createdAt: firestore.FieldValue.serverTimestamp(),
      lastSignInTime: createdUser.user.metadata.lastSignInTime,
    };

    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    // console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};
