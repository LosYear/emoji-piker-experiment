import React from 'react';
import './emojiSection.scss';
import Emoji from './Emoji';
import { EmojiList } from './emojiList';

export type EmojiSectionProps = EmojiList;

const EmojiSection: React.FC<EmojiSectionProps> = ({ title, items }) => (
    <div className="emoji-section">
        <div className="emoji-section__title">{title}</div>
        <div className="emoji-section__grid">
            {items.map((emoji) => (
                <Emoji icon={emoji} key={emoji} />
            ))}
        </div>
    </div>
);

export default EmojiSection;
