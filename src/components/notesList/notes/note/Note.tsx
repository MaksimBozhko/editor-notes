import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from '../../../editableSpan/EditableSpan';
import {useAppDispatch} from '../../../../hooks/hooks';
import {changeStatus, removeNote, updateNote} from '../../../../store/notesSlice';
import {addAllTags} from '../../../../store/appSlice';
import s from './note.module.scss'
import {ReactComponent as Delete} from '../../../../assets/images/delete.svg'

type TodoPropsType = {
    notesId: string;
    noteId: string;
    title: string;
    status: any;
};

export const Note: React.FC<TodoPropsType> = memo(({notesId, noteId, title, status}) => {
    const dispatch = useAppDispatch()

    const words = title.split(' ');
    const newTags = words.filter((word) => word.startsWith('#'))
    let arrForAllTags = newTags.map((t) => ({id:notesId, tag: t}))
    dispatch(addAllTags(arrForAllTags))

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 'completed' : 'active'
        dispatch(changeStatus({notesId, noteId, status}))

    };
    const updateTaskHandler = (title: string) => {
        dispatch(updateNote({notesId, noteId, title}))
    }
    const onChangeRemoveHandler = () => {
        dispatch(removeNote({notesId, noteId}))
    };

    return (
        <li key={noteId} className={s.note}>
            <input onChange={onChangeStatusHandler} type="checkbox" checked={status === 'completed'}/>
            <EditableSpan clasName={s.titleNote} callBack={updateTaskHandler} isDone={!!status} title={title}/>
            <Delete className={s.btnDelete} onClick={onChangeRemoveHandler} />
        </li>
    );
});
