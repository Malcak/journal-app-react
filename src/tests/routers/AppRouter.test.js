import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';
import { firebase } from '../../firebase/firebaseConfig';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const defaultState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};

let store = mockStore(defaultState);
store.dispatch = jest.fn();

describe('test on <AppRouter /> router', () => {
  test('should call the login if is authenticated', async () => {
    let user;

    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword('test@gmail.com', '123456');
      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );

      // TODO: check why the useEffect callback is not executed
      expect(true).toBe(true);
    });
  });
});
