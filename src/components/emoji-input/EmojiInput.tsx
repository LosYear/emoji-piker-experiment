import React, { useEffect, useRef, useState } from 'react';
import Input from '../input/Input';
import EmojiPopupConnected from '../emoji-popup/EmojiPopupConnected';
import EmojiButton from './EmojiButton';
import { CSSTransition } from 'react-transition-group';
import './emojiInput.scss';

const EmojiInput = () => {
    const inputRef = useRef();
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        if (!popupVisible) {
            return;
        }

        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setPopupVisible(false);
                // Todo: fix typings
                // @ts-ignore
                inputRef.current.focus();
            }
        };

        document.addEventListener('keydown', listener);

        return () => document.removeEventListener('keydown', listener);
    }, [popupVisible]);

    const onItemClick = (emoji: string) => {
        // Todo: fix typings
        // @ts-ignore
        inputRef.current.insertAtCurrentPosition(emoji);
    };

    const showPopup = () => setPopupVisible(true);

    return (
        <div onMouseLeave={() => setPopupVisible(false)} className="emoji-input">
            <Input
                ref={inputRef}
                actions={
                    <EmojiButton className="emoji-input__emoji-button" onMouseEnter={showPopup} onFocus={showPopup} />
                }
                className="emoji-input__input"
            />
            <CSSTransition in={popupVisible} timeout={300} classNames="emoji-input__animation">
                <EmojiPopupConnected onItemClick={onItemClick} className="emoji-input__popup" />
            </CSSTransition>
        </div>
    );
};

export default EmojiInput;
