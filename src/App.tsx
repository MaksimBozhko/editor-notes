import React, {useCallback} from 'react';
import s from './App.module.scss';
import {AddItem} from './components/addItem/AddItem';
import {NotesList} from './components/notesList/NotesList';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {addNotes} from './store/notesSlice';
import FilterTags from './components/filterTags/FilterTags';

function App() {
    const dispatch = useAppDispatch()
    const notesList = useAppSelector(state => state.notes)
    const {selectedTag} = useAppSelector(state => state.app)
    const addNotesHandler = (titleNotes: string) => {
        dispatch(addNotes(titleNotes))
    }

    const ArrNotesToRender = selectedTag.id ? notesList.filter((n) => n.id === selectedTag.id) : notesList
    const notes = ArrNotesToRender.map((t) => <NotesList key={t.id} id={t.id} title={t.title} filter={t.filter} notes={t.notes}/>)

    return (
        <div className={s.App}>
            <div className={s.headerBlock}>
                <AddItem text={'add new notes form'} callBack={addNotesHandler}/>
                <FilterTags/>
            </div>
            <div className={s.noteListBlock}>
                {notes}
            </div>
        </div>
    );
}

export default App;
