import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(note.id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title!"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <textarea
          name="body"
          placeholder="What happened today..."
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.imgUrl && (
          <div className="notes__image">
            <img src={note.imgUrl} alt="noteImage" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Remove
      </button>
    </div>
  );
};
