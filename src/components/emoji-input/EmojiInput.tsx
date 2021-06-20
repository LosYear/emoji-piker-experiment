import React, { useRef } from 'react';
import Popup from '../emoji/Popup';
import emojiList from '../emoji/emojiList';
import SmileIcon from '../../styleguide/icons/SmileIcon';
import ClockIcon from '../../styleguide/icons/ClockIcon';
import Input from '../input/Input';

const EmojiInput = () => {
    const inputRef = useRef();

    return (
        <div>
            <Popup
                onItemClick={(emoji: string) => {
                    // Todo: fix typings
                    // @ts-ignore
                    inputRef.current.insertAtCurrentPosition(emoji);
                }}
                sections={[
                    { items: emojiList, icon: <SmileIcon color="#99A2AD" /> },
                    { items: [], icon: <ClockIcon color="#99A2AD" /> },
                ]}
            />
            <Input ref={inputRef} />
        </div>
    );
};

export default EmojiInput;
