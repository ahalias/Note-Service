/* eslint-disable react/prop-types */
import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { AppDispatch, NewNoteType, NotesType, NotesProps, TagType } from "../types";
import { useDispatch } from "react-redux";
import { addNewNote, addNote } from "../slices/slice";
import noteService from "../services/noteService";
import { addTags, deleteTags } from "../slices/tagSlice";
import { processHashTags } from "../utils/hashTags";
import { v4 as uuidv4 } from 'uuid';



const NoteAddForm: React.FC<NotesProps> = ({ notes, tags }) => {

    const dispatch = useDispatch<AppDispatch>()

    const [noteText, setNoteText] = useState<NewNoteType>({text: '', tags: []});




    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const { text: coloratedHashTags, } = processHashTags(noteText.text)
        const newId = uuidv4();
        const noteToAdd = {id: newId, text: coloratedHashTags, tags: noteText.tags}
        dispatch(addNote(noteToAdd));
        const notesToAdd = [...notes.notes, noteToAdd];
        noteService.addNotesToLocalStorage(notesToAdd as unknown as NotesType);

        setNoteText({text: '', tags: []})
      };



    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.currentTarget.value
        const regex = /#[^\s]+/g;
        const tags = text.match(regex) || [];
        const newTags = tags.map((tag) => tag.trim());
        



    const tagsToDelete = noteText.tags.filter((tag) => !newTags.includes(tag));
    tagsToDelete.forEach((tag) => {
      dispatch(deleteTags(tag as unknown as TagType)); 
    });

    const tagsToAdd = newTags.filter((tag) => !noteText.tags.includes(tag));
    
    tagsToAdd.forEach((tag) => {
      dispatch(addTags(tag as unknown as TagType)); 
    });

    setNoteText({ text, tags: newTags });

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

