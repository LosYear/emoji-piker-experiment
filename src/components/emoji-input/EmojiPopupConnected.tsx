import React from 'react';
import Popup, { PopupProps } from '../emoji/Popup';
import allEmoji from './emojiList';
import SmileIcon from '../../styleguide/icons/SmileIcon';
import ClockIcon from '../../styleguide/icons/ClockIcon';
import useRecentEmojis from '../../hooks/useRecentEmojis';

export type EmojiPopupConnectedProps = Pick<PopupProps, 'onItemClick'>;

const EmojiPopupConnected: React.FC<EmojiPopupConnectedProps> = ({ onItemClick }) => {
    const { emojiList, addItem } = useRecentEmojis();

    return (
        <Popup
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
