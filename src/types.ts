import rootReducer from "./slices/rootReducer";
import store from "./slices/store";

export interface NewNoteType {
    text: string
}

export interface NoteType extends NewNoteType { 
    id: string
}

export interface NotesType {
    notes: NoteType[]
}



export type AppDispatch = typeof store.dispatch


export type RootState = ReturnType<typeof rootReducer>;
