import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
// import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import modalsReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  async: asyncReducer,
  form: FormReducer,
  // events: eventReducer,
  modals: modalsReducer,
  auth: authReducer,
  // toastr: toastrReducer
});

export default rootReducer;
