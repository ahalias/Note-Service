import { NoteType, NotesType } from "../types";


export const addNotesToLocalStorage = (notes: NotesType) => {
    if (notes) {
        console.log(notes)
        localStorage.setItem('notes', JSON.stringify(notes));

    }

}

export default { addNotesToLocalStorage }