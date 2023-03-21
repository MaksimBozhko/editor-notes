import React, {ChangeEvent, memo, useState} from 'react';
import s from './editableSpan.module.sass'

type EditableSpanType = {
    callBack: (title: string) => void
    isDone?: boolean
    title: string
    clasName?: any
};

export const EditableSpan: React.FC<EditableSpanType> = memo(({ callBack, isDone, title, clasName }) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const onDoubleClickHandler = () => {
        setEdit(!edit);
        callBack(newTitle);
    }
    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const isDoneClasses = isDone ? 'isDone' : 'notIsDone';
    return edit ? (
        <input
            value={newTitle}
            onBlur={onDoubleClickHandler}
            autoFocus
            onChange={onChangeItemTitleHandler}
        />
    ) : (
        <span onDoubleClick={onDoubleClickHandler} className={isDoneClasses}>
            <p className={clasName}>{highlightHashtags(newTitle)}</p>
    </span>
    )
})


function highlightHashtags(text: string) {
    return (
        <>
            {text.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                    {word.startsWith("#") ? <b>{word}</b> : word}{" "}
                </React.Fragment>
            ))}
        </>
    )
}