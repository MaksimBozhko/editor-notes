import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type AddItemFormType = {
    callBack: (title: string) => void
    disabled?: boolean
};

export const AddItem: React.FC<AddItemFormType> = memo(({ callBack, disabled = false }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<boolean>(false);

    const addItemHandler = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            callBack(title);
            setTitle('');
        } else {
            setError(true);
        }
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    };

    const onKeyDownTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler();
        }
    };

    return (
        <div>
            <input
                disabled={disabled}
                value={title}
                onChange={onChangeTitleHandler}
                onKeyDown={onKeyDownTitleHandler}
            />
            {/* <Button disabled={!title.trim()} handler={addItemHandler} name={'+'} /> */}
            <button onClick={addItemHandler}  disabled={disabled}>
                +
            </button>
            {/* {errorMessage} */}
        </div>
    );
});
