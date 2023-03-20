import React, {useCallback, useEffect} from 'react';
import {EditableSpan} from '../editableSpan/EditableSpan';
import {AddItem} from '../addItem/AddItem';

type TodolistPropsType = {

};

export const Notes: React.FC<TodolistPropsType> = (props) => {


    useEffect(() => {

    }, [])
    const onChangeRemoveTodoListHandler = () => {

    }

    const onChangeUpdateTodoListHandler = useCallback((newTitle: string) => {

    }, []);

    return (
        <div>
            <div>
                <EditableSpan callBack={onChangeUpdateTodoListHandler} title={'title'}/>
                <button onClick={onChangeRemoveTodoListHandler}>delete notes</button>
            </div>
            <AddItem />
            {/*<Tasks*/}
            {/*    id={id}*/}
            {/*    filter={filter}*/}
            {/*/>*/}
        </div>
    );
};