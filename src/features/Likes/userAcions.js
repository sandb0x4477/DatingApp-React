export const sendLike = (userId) => async (
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
    date: Date.now()
  };

  try {
    await firebase.push(`likes/${userId}`, newMessage);
  } catch (error) {
    console.log(error);
  }
};
