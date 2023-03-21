import {combineReducers, configureStore} from '@reduxjs/toolkit'
import notesSlice from './notesSlice';

const reducer = combineReducers({
    notes: notesSlice
})
export const store = configureStore({reducer})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;