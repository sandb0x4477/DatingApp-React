export const sendMessage = (channelId, message) => async (
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
    await firebase.push(`messages/${channelId}`, newMessage);
  } catch (error) {
    console.log(error);
  }
};
