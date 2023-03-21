import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from '../../../editableSpan/EditableSpan';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {changeStatus, removeNote, updateNote} from '../../../../store/notesSlice';

type TodoPropsType = {
    notesId: string;
    noteId: string;
    title: string;
    status: any;
};

export const Note: React.FC<TodoPropsType> = memo(({ notesId, noteId, title, status }) => {
    const dispatch = useAppDispatch()
    const notesList = useAppSelector(state => state.notes)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 'completed' : 'active'
        dispatch(changeStatus({notesId, noteId, status}))

    };

    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateNote({notesId, noteId, title}))
    }, []);

    const onChangeRemoveHandler = () => {
        dispatch(removeNote({notesId, noteId}))
    };
    return (
        <li key={noteId}>
            <input onChange={onChangeStatusHandler} type="checkbox" checked={status === 'completed'}/>
            <EditableSpan callBack={updateTaskHandler} isDone={!!status} title={title} />
            <button onClick={onChangeRemoveHandler}>delete note</button>
        </li>
    );
});
