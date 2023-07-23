import { NotesType } from "../types";


const addNotesToLocalStorage = (notes: NotesType) => {
    if (notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

}

const getAllNotes = () => {
        return localStorage.getItem('notes')
}

export default { addNotesToLocalStorage, getAllNotes }