import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesType, NoteType } from '../types';



const initialState: NotesType = { notes: [] };

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        loadNotes(state, action: PayloadAction<string>) {
            try {
                const parsedNotes = JSON.parse(action.payload)
                state.notes = parsedNotes
            } catch(error) {
                console.log(error)
            }


        },
        addNote(state, action: PayloadAction<NoteType>) {
            state.notes.push({ id: action.payload.id,  text: action.payload.text, tags: action.payload.tags});
        },
        editNote(state, action: PayloadAction<NoteType>) {
            const {id, text} = action.payload
            state.notes = state.notes.map((note) => note.id === id ? { id: id, text: text, tags: action.payload.tags } : note);
        },
        deleteNote(state, action: PayloadAction<string>) {
            state.notes = state.notes.filter((note) => note.id !== action.payload)
        },
    },
});




export const { addNote, editNote, deleteNote, loadNotes } = noteSlice.actions;
export default noteSlice.reducer;


