/*** @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'testing',
  },
  notes: {
    active: {
      id: '1Rz1JS3llkhnyAZKDC2w',
      title: 'Hello World',
      body: 'And welcome to a new video...',
      date: 1626559657254,
    },
  },
};

let store = mockStore(initState);

describe('test on notes actions', () => {
  afterAll(() => {
    db.disableNetwork();
  });

  beforeEach(() => {
    store = mockStore(initState);
  });

  test('should create a new note', async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesAddEntry,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    const docId = actions[0].payload.id;
    await db.doc(`testing/journal/notes/${docId}`).delete();
  });

  test('should load the notes', async () => {
    await store.dispatch(startLoadingNotes('testing'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      imgUrl: expect.anything(),
    };

    expect(actions[0].payload[0]).toEqual(expected);
  });

  test('should update the note', async () => {
    const note = {
      id: '1Rz1JS3llkhnyAZKDC2w',
      title: 'Hello World',
      body: 'And welcome to a new video...',
      date: 1626559657254,
    };
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdate);

    const docRef = await db.doc(`testing/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });
});
