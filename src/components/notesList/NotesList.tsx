import React, {FC, useCallback} from 'react';
import {EditableSpan} from '../editableSpan/EditableSpan';
import {AddItem} from '../addItem/AddItem';
import {Notes} from './notes/Notes';
import {addNote, FilterValuesType, NotesType, removeNotes, updateNotes} from '../../store/notesSlice';
import {useAppDispatch} from '../../hooks/hooks';
import {addAllTags} from '../../store/appSlice';
import s from './noteList.module.scss'

type NotesListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    notes: NotesType[]
};

export const NotesList: FC<NotesListPropsType> = ({id: notesId, filter, title, notes}) => {
    const dispatch = useAppDispatch()
    const addNotesHandler = useCallback((titleNote: string) => {
        dispatch(addNote({notesId, titleNote}))

        const words = titleNote.split(' ');
        const newTags = words.filter((word) => word.startsWith('#')) //.map((tag) => tag.slice(1));
        // dispatch(addTags({notesId, noteId, newTags}))
        let arrForAllTags = newTags.map((t) => ({id:notesId, tag: t}))
        dispatch(addAllTags(arrForAllTags))

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
                <EditableSpan clasName={s.titleNotes} callBack={onChangeUpdateTodoListHandler} title={title}/>
                <button className={s.btn} onClick={onChangeRemoveNotesHandler}>delete notes</button>
            </div>
            <AddItem callBack={addNotesHandler} />

            <Notes notesId={notesId} filter={filter} notes={notes} />
        </div>
    );
};