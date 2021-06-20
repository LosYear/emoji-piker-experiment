import React from 'react';
import './input.scss';
import RichInput from './RichInput';

const Input = () => (
    <div className="input">
        <RichInput />
        {/*<div className="input__inner" contentEditable />*/}
        {/*<div className="input__inner input__placeholder">Введите сообщение</div>*/}
    </div>
);

export default Input;
