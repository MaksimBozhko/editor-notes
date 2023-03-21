import React, { memo, useCallback } from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {changeFilter, FilterValuesType} from '../../store/notesSlice';
import s from './filterBlock.module.scss'

type FilterBlockPropsType = {
    id: string;
    filter: FilterValuesType;
};
export const FilterBlock: React.FC<FilterBlockPropsType> = memo(({ id, filter }) => {
    const dispatch = useAppDispatch()
    const changeFilterHandler = useCallback((value: FilterValuesType) => {
        dispatch(changeFilter({id, value}))
    },[]);

    return (
        <div className={s.btnGroup}>
            <button onClick={() => changeFilterHandler('all')}>
                All
            </button>
            <button onClick={() => changeFilterHandler('active')}>
                Active
            </button>
            <button onClick={() => changeFilterHandler('completed')}>
                Completed
            </button>
        </div>
    );
});
