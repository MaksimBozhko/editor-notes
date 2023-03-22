import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v1} from 'uuid';
import produce from 'immer';
import Data from '../data/data.json'

const initialState: NotesListType[] = Data

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNotes: (state, action: PayloadAction<string>) => {
            const newNotes = {id: v1(), title: action.payload, filter: 'all', notes: [] as NotesType[]};
            return produce(state, (draftState: { id: string; title: string; filter: string; notes: NotesType[]; }[]) => {
                draftState.push(newNotes);
            });
        },
        removeNotes: (state, action: PayloadAction<string>) => {
            return state.filter(n => n.id !== action.payload)
        },
        updateNotes: (state, action: PayloadAction<{ notesId: string, title: string }>) => {
            const { notesId, title } = action.payload;
            const noteIndex = state.findIndex((n) => n.id === notesId);
            if (noteIndex !== -1) {
                state[noteIndex].title = title
            }
        },
        addNote: (state, action: PayloadAction<{notesId: string, titleNote: string}>) => {
            const newNote = {id: v1(), title: action.payload.titleNote, status: 'active', timeAdded: ''}
            // @ts-ignore
            state.map(n => action.payload.notesId === n.id ? n.notes.unshift(newNote) : n)
        },
        removeNote: (state, action: PayloadAction<{ notesId: string, noteId: string }>) => {
            const { notesId, noteId } = action.payload;
            const noteIndex = state.findIndex((n) => n.id === notesId);
            if (noteIndex !== -1) {
                state[noteIndex].notes = state[noteIndex].notes.filter((note) => note.id !== noteId);
            }
        },
        updateNote: (state, action: PayloadAction<{ notesId: string, noteId: string, title: string }>) => {
            const { notesId, noteId, title } = action.payload;
            const noteIndex = state.findIndex((n) => n.id === notesId);
            if (noteIndex !== -1) {
                state[noteIndex].notes = state[noteIndex].notes.map((note) => {
                    if (note.id === noteId) {
                        return { ...note, title };
                    }
                    return note;
                });
            }
        },
        changeStatus: (state, action: PayloadAction<{ notesId: string, noteId: string, status: string }>) => {
            const { notesId, noteId, status } = action.payload
            const noteIndex = state.findIndex((n) => n.id === notesId)
            if (noteIndex !== -1) {
                state[noteIndex].notes = state[noteIndex].notes.map((note) => {
                    if (note.id === noteId) {
                        return { ...note, status: status }
                    }
                    return note;
                });
            }
        },
        changeFilter: (state, action: PayloadAction<{ id: string, value: FilterValuesType }>) => {
            const { id, value } = action.payload
            const noteIndex = state.findIndex((n) => n.id === id)
            if (noteIndex !== -1) {
                state[noteIndex].filter = value
            }
        },
        addTags: (state, action: PayloadAction<{ notesId: string, noteId: string, newTags: string[] }>) => {
            const { notesId, noteId, newTags } = action.payload;
            const noteIndex = state.findIndex((n) => n.id === notesId);
            if (noteIndex !== -1) {
                state[noteIndex].notes = state[noteIndex].notes.map((note) => {
                    if (note.id === noteId) note.tags = newTags
                    return note;
                });
            }
        },
    },
})

export const {addNotes, addNote, removeNotes, removeNote, updateNote, changeStatus, changeFilter, updateNotes, addTags} = notesSlice.actions
export default notesSlice.reducer

//types
export type NotesListType = {
    id: string
    title: string
    filter: string
    notes: NotesType[]
}
export type NotesType = {
    id: string
    title: string
    status: any
    timeAdded: string
    tags: string[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'