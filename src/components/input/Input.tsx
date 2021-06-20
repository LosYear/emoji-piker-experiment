import React, { useEffect, useRef, useState } from 'react';
import isEmail from '../../helpers/isEmail';
import isLink from '../../helpers/isLink';
import isMention from '../../helpers/isMention';
import isHashtag from '../../helpers/isHashtag';
import './input.scss';

type TextSegment = {
    text: string;
    node: Node;
};

// todo: document.execCommand('insertText', false, 'banana')

const getTextSegments = (root: Node) => {
    const segments: Array<TextSegment> = [];

    root.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            segments.push({ text: node.nodeValue || '', node });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            segments.splice(segments.length, 0, ...getTextSegments(node));
        }
    });

    return segments;
};

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

const restoreSelection = (input: Node, absoluteAnchorIndex: number, absoluteFocusIndex: number) => {
    const selection = window.getSelection();

    if (!selection) {
        return;
    }

    const textSegments = getTextSegments(input);

    let anchorNode = input;
    let anchorIndex = 0;

    let focusNode = input;
    let focusIndex = 0;

    let currentIndex = 0;

    textSegments.forEach(({ text, node }) => {
        if (!text) {
            return;
        }

        const startIndexOfNode = currentIndex;
        const endIndexOfNode = startIndexOfNode + text.length;

        if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
            anchorNode = node;
            anchorIndex = absoluteAnchorIndex - startIndexOfNode;
        }

        if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
            focusNode = node;
            focusIndex = absoluteFocusIndex - startIndexOfNode;
        }

        currentIndex += text.length;
    });

    selection.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
};

const onInput = (input: HTMLDivElement) => {
    const selection = window.getSelection();

    if (!selection) {
        return;
    }

    const textSegments = getTextSegments(input);

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

    console.log(formatText(textContent));

    input.innerHTML = formatText(textContent);

    restoreSelection(input, anchorIndex, focusIndex);
};

// todo: handle enter correctly

const Input = () => {
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const inputRef = useRef<HTMLDivElement>(null);

    const onInputUpdate = () => {
        if (!inputRef.current) {
            return;
        }

        onInput(inputRef.current);

        if (inputRef.current.innerHTML === '' && !showPlaceholder) {
            setShowPlaceholder(true);
        } else if (inputRef.current.innerHTML !== '' && showPlaceholder) {
            setShowPlaceholder(false);
        }
    };

    return (
        <div className="input">
            <div className="input__inner input__input" ref={inputRef} contentEditable onInput={onInputUpdate} />
            {showPlaceholder && <div className="input__inner input__placeholder">Введите сообщение</div>}
        </div>
    );
};

export default Input;
