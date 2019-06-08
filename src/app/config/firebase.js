import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';
// import 'dotenv/config';
// import firebase from 'firebase';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: 'https://dating-react.firebaseio.com',
  projectId: 'dating-react',
  storageBucket: 'dating-react.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);

export default firebase;
