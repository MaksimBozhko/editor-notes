import React, { memo, useCallback } from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {changeFilter, FilterValuesType} from '../../store/notesSlice';
import s from './filterBlock.module.scss'

type FilterBlockPropsType = {
    id: string
    filter: string
};
export const FilterBlock: React.FC<FilterBlockPropsType> = memo(({ id, filter }) => {
    const dispatch = useAppDispatch()
    const changeFilterHandler = (value: FilterValuesType) => {
        dispatch(changeFilter({id, value}))
    }
    const classNameAllBtn = `${s.btn} ${filter === 'all' ? ` ${s.active}` : ''}`
    const classNameActiveBtn = `${s.btn} ${filter === 'active' ? ` ${s.active}` : ''}`
    const classNameCompletedBtn = `${s.btn} ${filter === 'completed' ? ` ${s.active}` : ''}`
    return (
        <div className={s.btnGroup}>
            <button className={classNameAllBtn} onClick={() => changeFilterHandler('all')}>
                All
            </button>
            <button className={classNameActiveBtn} onClick={() => changeFilterHandler('active')}>
                Active
            </button>
            <button className={classNameCompletedBtn} onClick={() => changeFilterHandler('completed')}>
                Completed
            </button>
        </div>
    );
});
