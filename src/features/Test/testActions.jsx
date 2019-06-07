// import moment from 'moment';
// import firebase from '../../app/config/firebase';

export const sendMessage = (receiverId, message) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newMessage = {
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: message,
    date: Date.now()
  };

  try {
    await firebase.push(`messages/${user.uid}/${receiverId}`, newMessage);
  } catch (error) {
    console.log(error);
  }
};
