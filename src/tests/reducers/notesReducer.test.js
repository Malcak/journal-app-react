import { types } from '../../types/types';
import { notesReducer } from '../../reducers/notesReducer';
import notes from '../fixtures/notes';

describe('test on notes reducer', () => {
  let defaultState = {
    notes: [],
    active: null,
  };

  beforeEach(() => {
    defaultState = {
      notes: [],
      active: null,
    };
  });

  test('should return a state with the active note', () => {
    defaultState.notes = notes;
    const action = {
      type: types.notesActive,
      payload: {
        ...notes[0],
      },
    };
    const state = notesReducer(defaultState, action);
    expect(state.active).toEqual(notes[0]);
  });

  test('should return the new state with the added note', () => {
    defaultState.notes = notes;
    const newNote = {
      id: 'HcralL6oS3tMqFgzm9La',
      title: 'Hello World',
      body: 'And welcome to a new video...',
      date: 1626378790909,
      imgUrl:
        'https://res.cloudinary.com/malcak-media-cloud/image/upload/v1626378813/htjjxjjndcweyzl1zesr.jpg',
    };
    const action = {
      type: types.notesAddEntry,
      payload: newNote,
    };
    const state = notesReducer(defaultState, action);
    expect(state.notes.includes(newNote)).toBe(true);
  });

  test('should return the new state with the notes', () => {
    const action = {
      type: types.notesLoad,
      payload: [...notes],
    };
    const state = notesReducer(defaultState, action);
    expect(state.notes).toEqual(notes);
  });

  test('should return the new state with the note updated', () => {
    defaultState.notes = notes;
    const noteUpdated = {
      ...defaultState.notes[0],
      title: 'Hola mundo',
      body: 'Y bienvenidos a un nuevo video...',
    };
    const action = {
      type: types.notesUpdate,
      payload: {
        id: noteUpdated.id,
        note: noteUpdated,
      },
    };
    const state = notesReducer(defaultState, action);
    expect(state.notes.find((note) => note.id === noteUpdated.id)).toEqual(
      noteUpdated
    );
  });

  test('should return the new state without the deleted note', () => {
    defaultState.notes = notes;
    const id = defaultState.notes[0];
    const action = {
      type: types.notesDelete,
      payload: id,
    };
    const state = notesReducer(defaultState, action);
    expect(state.active).toEqual(null);
    expect(typeof state.notes.find((note) => note.id === id)).toBe('undefined');
  });

  test('should return the new state without the users notes', () => {
    defaultState.notes = notes;
    const state = notesReducer(defaultState, { type: types.notesLogoutClean });
    expect(state.active).toEqual(null);
    expect(state.notes).toEqual([]);
  });

  test('should return the default state', () => {
    const state = notesReducer(defaultState, { type: 'default' });
    expect(state).toEqual(defaultState);
  });
});
