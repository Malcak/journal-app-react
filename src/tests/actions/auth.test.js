import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const defaultState = {};

const defaultStateLogged = {
  auth: {
    uid: 'testing',
    displayName: 'test_user',
  },
};

let store = mockStore(defaultState);

describe('test on auth actions', () => {
  beforeEach(() => {
    store = mockStore(defaultState);
  });

  test('should create the login and logout action', () => {
    const { uid, displayName } = defaultStateLogged.auth;
    const loginAction = login(uid, displayName);
    const logoutAction = logout();
    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid, displayName },
    });
    expect(logoutAction).toEqual({ type: types.logout });
  });

  test('should logout', async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutClean });
  });

  test('should login with email and password', async () => {
    await store.dispatch(startLoginEmailPassword('test@gmail.com', '123456'));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: null,
      },
    });
  });
});
