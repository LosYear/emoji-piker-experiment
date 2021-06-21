import React, { useState } from 'react';
import './emojiPopup.scss';
import EmojiSection, { EmojiSectionProps } from './EmojiSection';
import { PopupEmojiList } from './types';
import classNames from 'classnames';

export type PopupProps = {
    sections: Array<{
        items: Array<PopupEmojiList>;
        icon: React.ReactNode;
    }>;

    onItemClick: EmojiSectionProps['onItemClick'];
    className?: string;
};

const EmojiPopup: React.FC<PopupProps> = ({ sections, className, onItemClick }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={classNames('emoji-popup', className)}>
            <div className="emoji-popup__container">
                <div className="emoji-popup__scroll-area-wrapper">
                    <div className="emoji-popup__scroll-area">
                        {sections[activeTab].items.map(({ title, items }) => (
                            <EmojiSection title={title} items={items} key={title} onItemClick={onItemClick} />
                        ))}
                    </div>
                </div>
                <div className="emoji-popup-tabs">
                    {sections.map(({ icon }, index) => (
                        <button
                            disabled={index === activeTab}
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={classNames(
                                'emoji-popup-tabs__tab',
                                index === activeTab && 'emoji-popup-tabs__tab_active'
                            )}>
                            <div className="emoji-popup-tabs__tab-icon">{icon}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="emoji-popup__tip-wrapper">
                <div className="emoji-popup__tip" />
            </div>
        </div>
    );
};

export default EmojiPopup;
