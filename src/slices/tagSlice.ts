import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TagType, TagsType } from "../types";


const initialState: TagsType = { tags: [] }


const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTags(state, action: PayloadAction<TagType>) {
            state.tags.push(action.payload);
        },
        deleteTags(state, action: PayloadAction<TagType>) {
            const index = state.tags.findIndex((tag) => tag === action.payload);
            state.tags = state.tags.slice(0, index).concat(state.tags.slice(index + 1));

              
        }
    }
})

export const { addTags, deleteTags } = tagSlice.actions;
export default tagSlice.reducer;