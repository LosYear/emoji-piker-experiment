import React from 'react';
import './emoji.scss';

export type EmojiProps = {
    icon: string;

    onClick: JSX.IntrinsicElements['button']['onClick'];
};

const Emoji: React.FC<EmojiProps> = ({ icon, onClick }) => (
    <button className="emoji" onClick={onClick}>
        <span>{icon}</span>
    </button>
);

export default Emoji;
