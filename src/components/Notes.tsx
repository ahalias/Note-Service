/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NoteType, NotesType, TagType, NotesProps } from "../types";
import { deleteNote, editNote, loadNotes } from "../slices/slice";
import { useDispatch } from "react-redux";
import noteService from "../services/noteService";
import DOMPurify from 'dompurify';
import { addTags, deleteTags } from "../slices/tagSlice";
import { processHashTags } from "../utils/hashTags";
import { Card, CardContent, Container, IconButton, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';


const Notes: React.FC<NotesProps> = ({ notes, tags }) => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
    
    useEffect(() => {
      const storedNotes = noteService.getAllNotes();

    if (storedNotes) {
          
        dispatch(loadNotes(storedNotes));
        JSON.parse(storedNotes).forEach((note: { tags: TagType[]; }) => {
          if (note.tags) {
            note.tags.forEach((tag) => dispatch(addTags(tag)))
          }
        })
        
      }
    }, [dispatch]);


    useEffect(() => {
      console.log(tags)
    }, [tags])



const handleDeleteNote = (note: NoteType) => {
  dispatch(deleteNote(note.id))
  const filteredNotes = notes.notes.filter((oldNote) => oldNote.id !== note.id)
            noteService.addNotesToLocalStorage(filteredNotes as unknown as NotesType)
  if (note.tags) {
    const tagsToDelete = note.tags
        tagsToDelete.forEach((tag) => {
          dispatch(deleteTags(tag as unknown as TagType)); 
        });

  }
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, note: NoteType) => {
  const { key } = event;
  if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
    event.preventDefault();
  }
}


const handleInput = (event: React.FormEvent<HTMLDivElement>, note: NoteType) => {
  return 1
}



    const handleBlur = (event: React.FormEvent<HTMLDivElement>, note: NoteType) => {
        let updatedContent = event.currentTarget.textContent
        if (updatedContent) {
          const regex = /#[^\s]+/g;
        const tags = updatedContent.match(regex) || [];
        const newTags = tags.map((tag) => tag.trim());

        updatedContent = processHashTags(updatedContent).text



        const tagsToDelete = note.tags.filter((tag) => !newTags.includes(tag));
        tagsToDelete.forEach((tag) => {
          dispatch(deleteTags(tag as unknown as TagType)); 
        });
    
        const tagsToAdd = newTags.filter((tag) => !note.tags.includes(tag));
        
        tagsToAdd.forEach((tag) => {
          dispatch(addTags(tag as unknown as TagType)); 
        });
            setContent(updatedContent);
            const noteToAdd = {id: note.id, text: updatedContent, tags: newTags}
            dispatch(editNote(noteToAdd))
            const editedNotes = notes.notes.map((newNote: NoteType) => newNote.id === noteToAdd.id ? noteToAdd : newNote);
            noteService.addNotesToLocalStorage([...editedNotes] as unknown as NotesType);

        }
      };

      const handleTagFilter = (tag: string) => {
        const newSelectedTags = new Set(selectedTags);
        if (newSelectedTags.has(tag)) {
          newSelectedTags.delete(tag);
          } else {
            newSelectedTags.add(tag);
          }
          setSelectedTags(newSelectedTags);
      }

      let filteredNotes = notes.notes.filter((note: NoteType) => {
        for (const tag of note.tags) {
          if (selectedTags.has(tag)) {
            return note
          }
        }
      });

      filteredNotes = filteredNotes.length > 0 ? filteredNotes : notes.notes
    
      return (
        <div>
        
        
        <div className='grid-container'>
        
        
        {filteredNotes.map((note) => (
        <Card key={note.id} className="card" elevation={3} style={{backgroundColor: "#EAECF0"}}>
        <IconButton size="small" className="delete-button" color="error" onClick={() => handleDeleteNote(note)}>
        <ClearIcon />
        </IconButton>
        <CardContent>
        <Typography>
        <div
className='item'
contentEditable
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.text) }}
onBlur={(event) => handleBlur(event, note)}
onKeyDown={(event) => handleKeyDown(event, note)}
onInput={(event) => handleInput(event, note)}
>
</div>
        </Typography>
        </CardContent>
        </Card>
        
        
        ))}
        </div>
        <p>
        <Container>
        
        
        {
        [...new Set(tags.tags)].map((tag: TagType, index: number) =>
        <span style={{
        margin: "3px",
        color: selectedTags.has(tag as unknown as string) ? "blue" : "black",
        cursor: "pointer",
        }} key={index}
        onClick={() => handleTagFilter(tag as unknown as string)}
        >
        {String(tag)}
        </span>
        )
        }
        </Container>
        
        
        </p>
        </div>
        );
        };
        
        
        
        
        export default Notes;