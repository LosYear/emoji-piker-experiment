import React from 'react';
import './emojiButton.scss';
import SmileIcon from '../../styleguide/icons/SmileIcon';

const EmojiButton = () => (
    <button className="emoji-button">
        <SmileIcon color="#C5D0DB" />
    </button>
);

export default EmojiButton;
