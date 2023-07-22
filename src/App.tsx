import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { NotesType, RootState } from './types';
import { addNote, editNote, deleteNote, loadNotes } from './slices/slice';
import Notes from './components/Notes';
import NoteAddForm from './components/NoteAddForm';


function App() {
const notes: NotesType = useSelector((state: RootState) => state.notes)
const dispatch = useDispatch()


  return (
    <div>
      Notes:
    <Notes notes={notes} />
    Add note:
    <NoteAddForm notes={notes} />
    </div>
  )
}

export default App;
