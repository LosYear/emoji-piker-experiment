import React from 'react';
import './emojiSection.scss';
import Emoji from './Emoji';
import { PopupEmojiList } from './types';

export type EmojiSectionProps = PopupEmojiList & { onItemClick: (emoji: string) => void };

const EmojiSection: React.FC<EmojiSectionProps> = ({ title, items, onItemClick }) => (
    <div className="emoji-section">
        <div className="emoji-section__title">{title}</div>
        <div className="emoji-section__grid">
            {items.map((emoji) => (
                <Emoji icon={emoji} key={emoji} onClick={() => onItemClick(emoji)} />
            ))}
        </div>
    </div>
);

export default EmojiSection;
