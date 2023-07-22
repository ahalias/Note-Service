import { combineReducers } from '@reduxjs/toolkit';
import noteReducer from './slice'

const rootReducer = combineReducers({
    notes: noteReducer,
});

export default rootReducer;
