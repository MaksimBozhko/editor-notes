import React, {memo} from 'react';
import {FilterBlock} from '../../filterBlock/FilterBlock';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {Note} from './note/Note';
import {FilterValuesType, NotesType} from '../../../store/notesSlice';

type TasksPropsType = {
    notesId: string
    filter: FilterValuesType
    notes: NotesType[]
};

export const Notes: React.FC<TasksPropsType> = memo(({ notesId, filter, notes }) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    const getFilteredTasks = () => {
        switch (filter) {
            case 'active':
                return notes.filter((t) => t.status === 'active');
            case 'completed':
                return notes.filter((t) => t.status === 'completed');
            default:
                return notes;
        }
    };
    let filteredTasksToRender: NotesType[] = getFilteredTasks();
    let filteredTasksToRenderMap = filteredTasksToRender.length ? (
        filteredTasksToRender.map(({ id, title, status }) => {
            return <Note key={id} notesId={notesId} noteId={id} title={title} status={status} />;
        })
    ) : (
        <span>Tasks list is empty</span>
    );

    return (
        <div>
            <ul ref={listRef}>{filteredTasksToRenderMap}</ul>
            <FilterBlock id={notesId} filter={filter} />
        </div>
    );
});
