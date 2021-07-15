import { db } from '../firebase/firebaseConfig';

export const loadNotes = async (uid) => {
  const notes = [];
  const notesSnap = await db
    .collection(`${uid}/journal/notes`)
    .orderBy('date')
    .get();
  notesSnap.forEach((snapChild) => {
    notes.push({
      id: snapChild.id,
      ...snapChild.data(),
    });
  });
  return notes;
};
