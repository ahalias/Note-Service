import rootReducer from "./slices/rootReducer";
import store from "./slices/store";

export interface NewNoteType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: any
    tags: string[]
}

export interface NoteType extends NewNoteType { 
    id: string
}

export interface NotesType {
    notes: NoteType[]
}

export interface TagType {
    text: string
}

export interface TagsType {
    tags: TagType[]
}

export interface NotesProps {
    notes: NotesType;
    tags: TagsType; 
  }

  export interface SimpleNotesProps {
    notes: NotesType;
  }


export type AppDispatch = typeof store.dispatch


export type RootState = ReturnType<typeof rootReducer>;
