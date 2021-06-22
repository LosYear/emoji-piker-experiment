import React from 'react';
import './emojiSection.scss';
import Emoji from './Emoji';
import { PopupEmojiList } from './types';

export type EmojiSectionProps = PopupEmojiList & { onItemClick: (emoji: string) => void };

const rowSize = 10;

const keyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;

    if (e.key === 'ArrowRight' && target.nextElementSibling) {
        (target.nextElementSibling as HTMLButtonElement).focus();
    } else if (e.key === 'ArrowLeft' && target.previousElementSibling) {
        (target.previousElementSibling as HTMLButtonElement).focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const direction = e.key === 'ArrowUp' ? -rowSize : rowSize;
        const children = Array.from((target.parentElement as HTMLDivElement).children);
        const index = children.indexOf(target) + direction;

        if (index >= 0 && index < children.length) {
            (children[index] as HTMLButtonElement).focus();
        }

        e.preventDefault();
    }
};

const EmojiSection: React.FC<EmojiSectionProps> = ({ title, items, onItemClick }) => (
    <div className="emoji-section">
        <div className="emoji-section__title">{title}</div>
        <div className="emoji-section__grid">
            {items.map((emoji, index) => (
                <Emoji
                    tabIndex={index === 0 ? 0 : -1}
                    icon={emoji}
                    key={emoji}
                    onClick={(e) => {
                        onItemClick(emoji);
                        e.currentTarget.focus();
                    }}
                    onKeyDown={keyDownHandler}
                />
            ))}
        </div>
    </div>
);

export default EmojiSection;
