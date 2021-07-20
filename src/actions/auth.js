import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { notesLogoutClean } from './notes';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch({ type: types.uiStartLoading });
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch({ type: types.uiFinishLoading });
      })
      .catch((e) => {
        dispatch({ type: types.uiFinishLoading });
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch({ type: types.uiStartLoading });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch({ type: types.uiFinishLoading });
      })
      .catch((e) => {
        dispatch({ type: types.uiFinishLoading });
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(notesLogoutClean());
  };
};

export const logout = () => ({
  type: types.logout,
});
