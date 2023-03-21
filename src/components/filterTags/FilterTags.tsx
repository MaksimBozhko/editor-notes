import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setSelectedTags, TagsType} from '../../store/appSlice';
import s from './filterTags.module.scss'
import {ReactComponent as Delete} from '../../assets/images/delete.svg'

const FilterTags = () => {
    const dispatch = useAppDispatch()
    const {tags, selectedTag} = useAppSelector(state => state.app)

    const inClickResetHandler = () => {
        dispatch(setSelectedTags({} as TagsType))
    }
    const onClickTagsHandler = (id: string, tag: string) => {
        dispatch(setSelectedTags({id, tag}))
    }
    return (
        <div className={s.filterTags}>
            <div className={s.tagsBlock}>
                <span>Click tags:</span> {tags.map((t) => <span className={s.tag} key={t.id}
                                                                onClick={() => onClickTagsHandler(t.id, t.tag)}>{t.tag}</span>)}
            </div>
            {selectedTag.tag
                && (<> <p className={s.currentTags}>current Tags: {selectedTag.tag}</p>
                    <Delete className={s.btnReset} onClick={inClickResetHandler}/> </>)}
        </div>
    );
};

export default FilterTags;