import {combineReducers, configureStore} from '@reduxjs/toolkit'
import notesSlice from './notesSlice';
import appSlice from './appSlice';

const reducer = combineReducers({
    notes: notesSlice,
    app: appSlice
})
export const store = configureStore({reducer})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;