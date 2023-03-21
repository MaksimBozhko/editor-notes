import React, {memo} from 'react';
import {FilterBlock} from '../../filterBlock/FilterBlock';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {Note} from './note/Note';
import {FilterValuesType, NotesType} from '../../../store/notesSlice';
import {useAppSelector} from '../../../hooks/hooks';
import s from './notes.module.scss'

type TasksPropsType = {
    notesId: string
    filter: FilterValuesType
    notes: NotesType[]
};

export const Notes: React.FC<TasksPropsType> = memo(({ notesId, filter, notes }) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const {selectedTag} = useAppSelector(state => state.app)
    const ArrNotesToRender = selectedTag.id ? notes.filter((n) => n.title.includes(selectedTag.tag)) : notes
    const getFilteredTasks = () => {
        switch (filter) {
            case 'active':
                return ArrNotesToRender.filter((t) => t.status === 'active');
            case 'completed':
                return ArrNotesToRender.filter((t) => t.status === 'completed');
            default:
                return ArrNotesToRender;
        }
    };
    let filteredTasksToRender: NotesType[] = getFilteredTasks();
    let filteredTasksToRenderMap = filteredTasksToRender.length ? (
        ArrNotesToRender.map(({ id, title, status }) => {
            return <Note key={id} notesId={notesId} noteId={id} title={title} status={status} />;
        })
    ) : (
        <span>Tasks list is empty</span>
    );

    return (
        <div>
            <ul className={s.noteItem} ref={listRef}>{filteredTasksToRenderMap}</ul>
            <FilterBlock id={notesId} filter={filter} />
        </div>
    );
});
