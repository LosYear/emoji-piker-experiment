import React from 'react';
import Input from './components/input/Input';
import PageLayout from './components/page-layout/PageLayout';
import InputContainer from './components/input-container/InputContainer';
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
            <InputContainer>
                <Input />
            </InputContainer>
        </PageLayout>
    </div>
);

export default App;
