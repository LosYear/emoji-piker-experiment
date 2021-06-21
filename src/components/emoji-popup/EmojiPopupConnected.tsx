import React from 'react';
import EmojiPopup, { PopupProps } from '../emoji-popup/EmojiPopup';
import allEmoji from './emojiList';
import SmileIcon from '../../styleguide/icons/SmileIcon';
import ClockIcon from '../../styleguide/icons/ClockIcon';
import useRecentEmojis from '../../hooks/useRecentEmojis';

export type EmojiPopupConnectedProps = Omit<PopupProps, 'sections'>;

const EmojiPopupConnected: React.FC<EmojiPopupConnectedProps> = ({ onItemClick, className }) => {
    const { emojiList, addItem } = useRecentEmojis();

    return (
        <EmojiPopup
            className={className}
            onItemClick={(emoji: string) => {
                onItemClick(emoji);
                addItem(emoji);
            }}
            sections={[
                { items: allEmoji, icon: <SmileIcon color="#99A2AD" /> },
                { items: [{ title: 'Недавние', items: emojiList }], icon: <ClockIcon color="#99A2AD" /> },
            ]}
        />
    );
};

export default EmojiPopupConnected;
