import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { NotesType, RootState, TagsType } from './types';
import { addNote, editNote, deleteNote, loadNotes } from './slices/slice';
import Notes from './components/Notes';
import NoteAddForm from './components/NoteAddForm';


function App() {
const notes: NotesType = useSelector((state: RootState) => state.notes)
const tags: TagsType = useSelector((state: RootState) => state.tags)
const dispatch = useDispatch()


  return (
    <div>
      Notes:
    <Notes notes={notes} tags={tags} />
    Add note:
    <NoteAddForm notes={notes} tags={tags} />
    </div>
  )
}

export default App;
