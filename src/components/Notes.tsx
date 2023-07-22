import { SyntheticEvent, useEffect, useState } from "react";
import { NoteType, NotesType } from "../types";
import { deleteNote, editNote, loadNotes } from "../slices/slice";
import { useDispatch } from "react-redux";
import noteService from "../services/noteService";
import DOMPurify from 'dompurify';




const Notes = ({ notes }: {notes: NotesType}) => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    
    useEffect(() => {
      const storedNotes = localStorage.getItem('notes');
      if (storedNotes) {
        dispatch(loadNotes(storedNotes));
      }
    }, [dispatch]);

    const handleInput = (event: React.FormEvent<HTMLDivElement>, id: string) => {
        event.preventDefault();
        const updatedContent = event.currentTarget.textContent
        if (updatedContent) {
            setContent(updatedContent);
            dispatch(editNote({id: id, text: updatedContent}))
        }
      };
    
    return (
        <div>
        {notes.notes.map((note: NoteType) => 
        <div key ={note.id}>
        <div
        contentEditable
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '50px',
        }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.text) }} 
        onBlur={(event) => handleInput(event, note.id)}
      >
</div>
        <button type="submit" onClick={() => dispatch(deleteNote(note.id))}>delete</button>
        </div>
        )}
        </div>
    );
};


export default Notes;