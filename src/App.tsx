import './App.css';
import { useSelector } from 'react-redux';
import { NotesType, RootState, TagsType } from './types';
import Notes from './components/Notes';
import NoteAddForm from './components/NoteAddForm';
import { Typography, Container } from '@mui/material';



function App() {
const notes: NotesType = useSelector((state: RootState) => state.notes)
const tags: TagsType = useSelector((state: RootState) => state.tags)


  return (
    <Container className='cover'>
           <Container>
       <Typography variant="h5" component="h1" >
      Notes:
      </Typography>
    <Notes notes={notes} tags={tags} />
    </Container>
    <Container>
    <Typography variant="h5" component="h1">
    Add note:
    </Typography>
    <NoteAddForm notes={notes} />
    </Container>
    </Container>
  )
}

export default App;
