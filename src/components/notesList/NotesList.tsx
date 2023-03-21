import React, {FC, useCallback, useEffect} from 'react';
import {EditableSpan} from '../editableSpan/EditableSpan';
import {AddItem} from '../addItem/AddItem';
import {Notes} from './notes/Notes';
import {addNote, addNotes, FilterValuesType, NotesType, removeNotes, updateNotes} from '../../store/notesSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

type NotesListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    notes: NotesType[]
};

export const NotesList: FC<NotesListPropsType> = ({id: notesId, filter, title, notes}) => {

    const dispatch = useAppDispatch()
    useEffect(() => {

    }, [])
    const addNotesHandler = useCallback((titleNote: string) => {
        dispatch(addNote({notesId, titleNote}))
    }, []);
    const onChangeRemoveNotesHandler = () => {
        dispatch(removeNotes(notesId))
    }

    const onChangeUpdateTodoListHandler = useCallback((title: string) => {
        dispatch(updateNotes({notesId, title}))
    }, []);

    return (
        <div>
            <div>
                <EditableSpan callBack={onChangeUpdateTodoListHandler} title={title}/>
                <button onClick={onChangeRemoveNotesHandler}>delete notes</button>
            </div>
            <AddItem callBack={addNotesHandler} />

            <Notes notesId={notesId} filter={filter} notes={notes} />
        </div>
    );
};