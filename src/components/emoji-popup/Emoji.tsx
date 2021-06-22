import React from 'react';
import './emoji.scss';

export type EmojiProps = {
    icon: string;
} & Pick<JSX.IntrinsicElements['button'], 'tabIndex' | 'onClick' | 'onKeyDown'>;

const Emoji: React.FC<EmojiProps> = ({ icon, onClick, tabIndex, onKeyDown }) => (
    <button className="emoji" onClick={onClick} tabIndex={tabIndex} onKeyDown={onKeyDown}>
        <span>{icon}</span>
    </button>
);

export default Emoji;
