import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Siderbar } from '../../../components/journal/Siderbar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),
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

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Siderbar />
    </MemoryRouter>
  </Provider>
);

describe('test on <Sidebar /> component', () => {
  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('logout should be triggered', () => {
    wrapper.find('button').prop('onClick')();
    expect(startLogout).toHaveBeenCalled();
  });

  test('should start a new note', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect(startNewNote).toHaveBeenCalled();
  });
});
