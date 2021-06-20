// todo: rename

import React, { useState } from 'react';
import './popup.scss';
import { EmojiList } from './emojiList';
import EmojiSection, { EmojiSectionProps } from './EmojiSection';

export type PopupProps = {
    sections: Array<{
        items: Array<EmojiList>;
        icon: React.ReactNode;
    }>;

    onItemClick: EmojiSectionProps['onItemClick'];
};

const Popup: React.FC<PopupProps> = ({ sections, onItemClick }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="popup">
            <div className="popup__container">
                <div className="popup__scroll-area-wrapper">
                    <div className="popup__scroll-area">
                        {sections[activeTab].items.map(({ title, items }) => (
                            <EmojiSection title={title} items={items} key={title} onItemClick={onItemClick} />
                        ))}
                    </div>
                </div>
                <div className="popup-tabs">
                    {sections.map(({ icon }, index) => (
                        <div
                            key={index}
                            className={'popup-tabs__tab' + (index === activeTab ? ' popup-tabs__tab_active' : '')}>
                            <div className="popup-tabs__tab-icon">{icon}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="popup__tip-wrapper">
                <div className="popup__tip" />
            </div>
        </div>
    );
};

export default Popup;
