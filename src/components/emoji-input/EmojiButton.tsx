import React from 'react';
import './emojiButton.scss';
import SmileIcon from '../../styleguide/icons/SmileIcon';
import classNames from 'classnames';

type EmojiButtonProps = { className?: string } & Pick<JSX.IntrinsicElements['button'], 'onMouseEnter' | 'onFocus'>;

const EmojiButton: React.FC<EmojiButtonProps> = ({ onMouseEnter, onFocus, className }) => (
    <button className={classNames('emoji-button', className)} onMouseEnter={onMouseEnter} onFocus={onFocus}>
        <SmileIcon color="#C5D0DB" />
    </button>
);

export default EmojiButton;
