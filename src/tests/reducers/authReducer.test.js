import { types } from '../../types/types';
import { authReducer } from '../../reducers/authReducer';

describe('test on auth reducer', () => {
  const defaultState = {
    uid: 'tBv4omJbtgU7JAWn4Q7ctqg7Zif2',
    name: 'test_user_0',
  };

  test('should return the login state', () => {
    const defaultState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'qBv3omJbtjU7NAWm4Q7dtqt7Zhf7',
        displayName: 'test_user_1',
      },
    };

    const state = authReducer(defaultState, action);

    expect(state).toEqual({
      uid: action.payload.uid,
      name: action.payload.displayName,
    });
  });

  test('should return the logout state', () => {
    const state = authReducer(defaultState, {
      type: types.logout,
    });

    expect(state).toEqual({});
  });

  test('should return the default state', () => {
    const state = authReducer(defaultState, {
      type: 'default',
    });

    expect(state).toEqual(defaultState);
  });
});
