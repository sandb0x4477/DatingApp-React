import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';
// import 'dotenv/config';
// import firebase from 'firebase';
// import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAIJ00C9WTqddj45U8Ra6ebapoSjlFXlXM',
  authDomain: 'dating-react.firebaseapp.com',
  databaseURL: 'https://dating-react.firebaseio.com',
  projectId: 'dating-react',
  storageBucket: 'dating-react.appspot.com',
  messagingSenderId: '632510171034',
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);

export default firebase;
