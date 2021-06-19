import React from 'react';
import './emoji.scss';

export type EmojiProps = {
    icon: string;
};

const Emoji: React.FC<EmojiProps> = ({ icon }) => (
    <div className="emoji">
        <span>{icon}</span>
    </div>
);

export default Emoji;
