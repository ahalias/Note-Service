import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, NewNoteType, NotesType, NoteType, RootState } from '../types';
import { v4 as uuidv4 } from 'uuid';
import noteService from '../services/noteService';
import { useSelector } from 'react-redux';



const initialState: NotesType = { notes: [] };

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        loadNotes(state, action: PayloadAction<string>) {
            const parsedNotes = JSON.parse(action.payload)
                state.notes = parsedNotes
                localStorage.getItem('notes')

        },
        addNote(state, action: PayloadAction<NewNoteType>) {
            const newId = uuidv4();
            state.notes.push({ id: newId,  text: action.payload.text });
            localStorage.setItem('notes', JSON.stringify(state.notes))
        },
        editNote(state, action: PayloadAction<NoteType>) {
            const {id, text} = action.payload
            state.notes = state.notes.map((note) => note.id === id ? { id: id, text: text } : note);
            localStorage.setItem('notes', JSON.stringify(state.notes))
        },
        deleteNote(state, action: PayloadAction<string>) {
            state.notes = state.notes.filter((note) => note.id !== action.payload)
            localStorage.setItem('notes', JSON.stringify(state.notes));
        },
    },
});


export const addNewNote = (note: NewNoteType) => {
    return async (dispatch: AppDispatch) => {
      dispatch(addNote(note));
      
    };
  };

export const { addNote, editNote, deleteNote, loadNotes } = noteSlice.actions;
export default noteSlice.reducer;


