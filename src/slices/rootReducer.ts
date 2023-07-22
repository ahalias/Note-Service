import { combineReducers } from '@reduxjs/toolkit';
import noteReducer from './slice'
import tagReducer from './tagSlice'

const rootReducer = combineReducers({
    notes: noteReducer,
    tags: tagReducer,
});

export default rootReducer;
