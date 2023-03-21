import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from './addItem.module.scss'

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
            <div>
                <input className={s.input}
                       disabled={disabled}
                       value={title}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownTitleHandler}
                />
                <button onClick={addItemHandler}  disabled={disabled}>
                    +
                </button>
            </div>
        </div>
    );
});
