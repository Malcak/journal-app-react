import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
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

describe('test on <LoginScreen /> component', () => {
  beforeEach(() => {
    store = mockStore(defaultState);
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('google login should be triggered', () => {
    wrapper.find('.google-btn').prop('onClick')();
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('login with email and password should be triggered', () => {
    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });
    expect(startLoginEmailPassword).toHaveBeenCalled();
  });
});
