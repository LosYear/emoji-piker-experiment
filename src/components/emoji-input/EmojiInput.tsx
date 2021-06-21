import React, { useRef, useState } from 'react';
import Input from '../input/Input';
import EmojiPopupConnected from '../emoji-popup/EmojiPopupConnected';
import EmojiButton from './EmojiButton';
import { CSSTransition } from 'react-transition-group';
import './emojiInput.scss';

const EmojiInput = () => {
    const inputRef = useRef();
    const [popupVisible, setPopupVisible] = useState(false);

    const onItemClick = (emoji: string) => {
        // Todo: fix typings
        // @ts-ignore
        inputRef.current.insertAtCurrentPosition(emoji);
    };

    const showPopup = () => setPopupVisible(true);

    return (
        <div onMouseLeave={() => setPopupVisible(false)} className="emoji-input">
            <CSSTransition in={popupVisible} timeout={300} classNames="emoji-input__animation">
                <EmojiPopupConnected onItemClick={onItemClick} className="emoji-input__popup" />
            </CSSTransition>
            <Input ref={inputRef} actions={<EmojiButton onMouseEnter={showPopup} onFocus={showPopup} />} />
        </div>
    );
};

export default EmojiInput;
