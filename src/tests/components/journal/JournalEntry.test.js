import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';
import notes from '../../fixtures/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const defaultState = {};

let store = mockStore(defaultState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry {...notes[0]} />
    </MemoryRouter>
  </Provider>
);

describe('test on <JournalEntry /> component', () => {
  test('should display correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should activate the note', () => {
    wrapper.find('.journal__entry').prop('onClick')();
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(notes[0].id, { ...notes[0] })
    );
  });
});
