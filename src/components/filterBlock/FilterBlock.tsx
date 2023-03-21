import React, { memo, useCallback } from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {changeFilter, FilterValuesType} from '../../store/notesSlice';

type FilterBlockPropsType = {
    id: string;
    filter: any;
};
export const FilterBlock: React.FC<FilterBlockPropsType> = memo(({ id, filter }) => {
    const dispatch = useAppDispatch()
    const changeFilterHandler = useCallback((value: FilterValuesType) => {
        dispatch(changeFilter({id, value}))
    },[]);

    return (
        <div>
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
