import React, { useRef } from 'react';
import isEmail from '../../helpers/isEmail';
import isLink from '../../helpers/isLink';
import isMention from '../../helpers/isMention';
import isHashtag from '../../helpers/isHashtag';

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
            return `<span style='color:red'>${word}</span>`;
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

const RichInput = () => {
    const inputRef = useRef<HTMLDivElement>(null);

    return <div ref={inputRef} contentEditable onInput={() => onInput(inputRef.current as HTMLDivElement)} />;
};

export default RichInput;
