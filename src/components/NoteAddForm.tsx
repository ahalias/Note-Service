/* eslint-disable react/prop-types */
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { AppDispatch, NewNoteType, NotesType, NotesProps, TagType } from "../types";
import { useDispatch } from "react-redux";
import { addNote } from "../slices/slice";
import noteService from "../services/noteService";
import { addTags, deleteTags } from "../slices/tagSlice";
import { processHashTags } from "../utils/hashTags";
import { v4 as uuidv4 } from 'uuid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from "@mui/material";



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
                    <TextareaAutosize
                    aria-label="minimum height"
                    placeholder="Enter your text here..."
                    name='noteText'
                    value={noteText.text}
                    onChange={handleChange} 
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        minHeight: '50px',
                        width: '80%',
                        resize: 'both',
                    }}
                    
                    />
                    <br/>
                    <Button color="primary" variant='contained' type="submit">Submit</Button>
                    
</form>


        </div>



    );
};

export default NoteAddForm;

