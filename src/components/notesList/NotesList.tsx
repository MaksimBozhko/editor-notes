import React, {FC, useCallback} from 'react';
import {EditableSpan} from '../editableSpan/EditableSpan';
import {AddItem} from '../addItem/AddItem';
import {Notes} from './notes/Notes';
import {addNote, NotesType, removeNotes, updateNotes} from '../../store/notesSlice';
import {useAppDispatch} from '../../hooks/hooks';
import s from './noteList.module.scss'
import {ReactComponent as Delete} from '../../assets/images/delete.svg'

type NotesListPropsType = {
    id: string
    title: string
    filter: string
    notes: NotesType[]
};

export const NotesList: FC<NotesListPropsType> = ({id: notesId, filter, title, notes}) => {
    const dispatch = useAppDispatch()
    const addNotesHandler =(titleNote: string) => {
        dispatch(addNote({notesId, titleNote}))
    }
    const onChangeRemoveNotesHandler = () => {
        dispatch(removeNotes(notesId))
    }
    const onChangeUpdateTodoListHandler = (title: string) => {
        dispatch(updateNotes({notesId, title}))
    }

    return (
        <div className={s.noteList}>
            <div className={s.block}>
                <EditableSpan clasName={s.titleNotes} callBack={onChangeUpdateTodoListHandler} title={title}/>
                <Delete className={s.btn} onClick={onChangeRemoveNotesHandler} />
            </div>
            <AddItem callBack={addNotesHandler} />
            <Notes notesId={notesId} filter={filter} notes={notes} />
        </div>
    );
};