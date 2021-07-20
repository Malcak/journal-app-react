import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

      dispatch(activeNote(doc.id, newNote));
      dispatch(addNewNote(doc.id, newNote));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewNote = (id, note) => ({
  type: types.notesAddEntry,
  payload: {
    id,
    ...note,
  },
});

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.imgUrl) {
      delete note.imgUrl;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note.id, note));
    Swal.fire('Saved', note.title, 'success');
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note,
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active } = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const fileUrl = await fileUpload(file);
    active.imgUrl = fileUrl;
    dispatch(startSaveNote(active));
    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const notesLogoutClean = () => ({
  type: types.notesLogoutClean,
});
