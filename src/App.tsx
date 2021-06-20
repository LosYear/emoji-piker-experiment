import React from 'react';
import Input from './components/input/Input';
import PageLayout from './components/page-layout/PageLayout';
import Popup from './components/emoji/Popup';
import emojiList from './components/emoji/emojiList';
import SmileIcon from './styleguide/icons/SmileIcon';
import ClockIcon from './styleguide/icons/ClockIcon';
import EmojiInput from './components/emoji-input/EmojiInput';

const App = () => (
    <div>
        <PageLayout>
            <EmojiInput />
        </PageLayout>
    </div>
);

export default App;
