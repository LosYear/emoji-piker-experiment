import React from 'react';
import './emojiButton.scss';
import SmileIcon from '../../styleguide/icons/SmileIcon';

type EmojiButtonProps = Pick<JSX.IntrinsicElements['button'], 'onMouseEnter' | 'onFocus'>;

const EmojiButton: React.FC<EmojiButtonProps> = ({ onMouseEnter, onFocus }) => (
    <button className="emoji-button" onMouseEnter={onMouseEnter} onFocus={onFocus}>
        <SmileIcon color="#C5D0DB" />
    </button>
);

export default EmojiButton;
