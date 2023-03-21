import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setSelectedTags, TagsType} from '../../store/appSlice';

const FilterTags = () => {
    const dispatch = useAppDispatch()
    const {tags} = useAppSelector(state => state.app)

    const inClickResetHandler = () => {
        dispatch(setSelectedTags({} as TagsType))
    }
    const onClickTagsHandler = (id: string, tag: string) => {
        dispatch(setSelectedTags({id, tag}))
    }
    return (
        <div>
            {tags.map((t) => <li key={t.id} onClick={() => onClickTagsHandler(t.id, t.tag)}>{t.tag}</li>)}
            <button onClick={inClickResetHandler}>reset filter</button>
        </div>
    );
};

export default FilterTags;