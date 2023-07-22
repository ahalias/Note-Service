import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { AppDispatch, NewNoteType, NotesType } from "../types";
import { useDispatch } from "react-redux";
import { addNewNote, loadNotes } from "../slices/slice";
import noteService from "../services/noteService";



const NoteAddForm = ({notes}: {notes: NotesType}) => {

    const dispatch = useDispatch<AppDispatch>()


    const [noteText, setNoteText] = useState<NewNoteType>({text: ''});


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(addNewNote({ text: noteText.text }));
        setNoteText({text: ''})
      };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText({text: event.currentTarget.value});
    }

    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <textarea
                    name='noteText'
                    value={noteText.text}
                    onChange={handleChange} 
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '50px',
                        width: '100%',
                        resize: 'both',
                    }}
                    />
                    <br/>
                    <button type="submit">Submit</button>
                    
</form>
        </div>
    );
};

export default NoteAddForm;