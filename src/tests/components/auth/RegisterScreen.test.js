import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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

describe('test on <RegisterScreen /> component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>
  );

  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('ui error should be triggered by invalid email', () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate('change', { target: { value: '', name: 'email' } });
    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is no valid',
    });
  });

  test('should display the alert with the error', () => {
    const defaultState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is no valid',
      },
      notes: {
        active: null,
        notes: [],
      },
    };

    const store = mockStore(defaultState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
      defaultState.ui.msgError
    );
  });
});
