import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';
import notes from '../../fixtures/notes';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
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
    active: notes[0],
    notes: notes,
  },
};

let store = mockStore(defaultState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);

describe('test on <NoteScreen /> component', () => {
  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should trigger the change of the active note', () => {
    wrapper
      .find('input[name="title"]')
      .simulate('change', { target: { name: 'title', value: 'Hello Again' } });

    expect(activeNote).toHaveBeenCalledWith(notes[0].id, {
      ...notes[0],
      title: 'Hello Again',
    });
  });
});
