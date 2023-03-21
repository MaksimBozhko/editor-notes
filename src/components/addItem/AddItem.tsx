import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from './addItem.module.scss'
import {ReactComponent as Add} from '../../assets/images/add.svg'

type AddItemFormType = {
    callBack: (title: string) => void
    disabled?: boolean
    text?: string
};

export const AddItem: React.FC<AddItemFormType> = memo(({ callBack, disabled = false, text }) => {
    const [title, setTitle] = useState('');

    const addItemHandler = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            callBack(title);
            setTitle('');
        }
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyDownTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler();
        }
    };

    return (
        <div className={s.addItemBlock}>
            <h2 className={s.title}>{text}</h2>
            <div className={s.form}>
                <input className={s.input}
                       disabled={disabled}
                       value={title}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownTitleHandler}
                />
                <Add className={s.btnAdd} onClick={addItemHandler} />
            </div>
        </div>
    );
});
