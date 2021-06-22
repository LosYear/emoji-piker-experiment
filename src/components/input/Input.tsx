import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import isEmail from '../../helpers/isEmail';
import isLink from '../../helpers/isLink';
import isMention from '../../helpers/isMention';
import isHashtag from '../../helpers/isHashtag';
import './input.scss';
import {
    getTextSegmentsFromNode,
    insertAtCurrentPosition,
    restoreSelection,
    setSelectionAtEnd,
} from '../../helpers/selection';
import classNames from 'classnames';

const formatText = (text: string) => {
    const words = text.split(/(\s+)/);

    const output = words.map((word) => {
        if (isEmail(word) || isLink(word) || isMention(word) || isHashtag(word)) {
            return `<span>${word}</span>`;
        } else {
            return word;
        }
    });

    return output.join('');
};

const onInput = (input: HTMLDivElement) => {
    const selection = window.getSelection();

    if (!selection) {
        return;
    }

    const textSegments = getTextSegmentsFromNode(input);

    const textContent = textSegments.map(({ text }) => text).join('');

    let anchorIndex = 0;
    let focusIndex = 0;
    let currentIndex = 0;

    textSegments.forEach(({ text, node }) => {
        if (node === selection.anchorNode) {
            anchorIndex = currentIndex + selection.anchorOffset;
        }

        if (node === selection.focusNode) {
            focusIndex = currentIndex + selection.focusOffset;
        }

        currentIndex += text.length;
    });

    input.innerHTML = formatText(textContent);

    restoreSelection(input, anchorIndex, focusIndex);
};

// todo: handle enter correctly

type InputProps = {
    actions: React.ReactNode;
    className?: string;
} & Pick<JSX.IntrinsicElements['input'], 'onKeyDown'>;

// todo: fix typings
const Input = forwardRef<unknown, InputProps>(({ actions, className, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLDivElement>(null);

    const onInputUpdate = () => {
        if (!inputRef.current) {
            return;
        }

        onInput(inputRef.current);
    };

    const insertChar = (char: string) => {
        const selection = window.getSelection();

        if (!selection || !inputRef.current) {
            return;
        }

        const hasNoFocusWithin =
            !selection.focusNode ||
            (selection.focusNode !== inputRef.current && selection.focusNode.parentNode !== inputRef.current);

        if (hasNoFocusWithin) {
            setSelectionAtEnd(inputRef.current);
        }

        insertAtCurrentPosition(char);
    };

    useImperativeHandle(ref, () => ({
        insertAtCurrentPosition: insertChar,
        focus: () => {
            inputRef.current?.focus();
        },
    }));

    return (
        <div className={classNames('input', className)}>
            <div
                className="input__inner input__input"
                ref={inputRef}
                contentEditable
                onInput={onInputUpdate}
                onKeyDown={onKeyDown}
                role="textbox"
                aria-multiline
            />
            {actions}
        </div>
    );
});

export default Input;
