import React from 'react';
import Input from './components/input/Input';
import PageLayout from './components/page-layout/PageLayout';
import Popup from './components/emoji/Popup';
import emojiList from './components/emoji/emojiList';
import SmileIcon from './styleguide/icons/SmileIcon';
import ClockIcon from './styleguide/icons/ClockIcon';

const App = () => (
    <div>
        <PageLayout>
            <Popup
                sections={[
                    { items: emojiList, icon: <SmileIcon color="#99A2AD" /> },
                    { items: [], icon: <ClockIcon color="#99A2AD" /> },
                ]}
            />
            <Input />
        </PageLayout>
    </div>
);

export default App;
