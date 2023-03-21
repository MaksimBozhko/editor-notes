import React, {useCallback} from 'react';
import './App.css';
import {AddItem} from './components/addItem/AddItem';
import {NotesList} from './components/notesList/NotesList';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {addNotes} from './store/notesSlice';

function App() {
    const dispatch = useAppDispatch()
    const notesList = useAppSelector(state => state.notes)
    const addNotesHandler = useCallback((titleNotes: string) => {
        dispatch(addNotes(titleNotes))
    }, []);
    const notes = notesList.map((t) => <NotesList key={t.id} id={t.id} title={t.title} filter={t.filter} notes={t.notes}/>)

    return (
        <div className="App">
            <div>
                <AddItem callBack={addNotesHandler}/>
            </div>
            <div>
                {notes}
            </div>
        </div>
    );
}

export default App;
