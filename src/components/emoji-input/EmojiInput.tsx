import React, { useRef } from 'react';
import Input from '../input/Input';
import EmojiPopupConnected from './EmojiPopupConnected';

const EmojiInput = () => {
    const inputRef = useRef();

    const onItemClick = (emoji: string) => {
        // Todo: fix typings
        // @ts-ignore
        inputRef.current.insertAtCurrentPosition(emoji);
    };

    return (
        <div>
            <EmojiPopupConnected onItemClick={onItemClick} />
            <Input ref={inputRef} />
        </div>
    );
};

export default EmojiInput;
