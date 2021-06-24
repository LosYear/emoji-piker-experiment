export const setSelectionAfterElement = (node: Node) => {
    const selection = document.getSelection();

    if (!selection) {
        return;
    }

    const newRange = document.createRange();
    newRange.setStartAfter(node);
    selection.removeAllRanges();
    selection.addRange(newRange);
};

export const setSelectionAtEnd = (node: Node) => {
    const selection = document.getSelection();

    if (!selection) {
        return null;
    }

    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
};

export const insertAtCurrentPosition = (char: string) => {
    const selection = document.getSelection();

    if (!selection) {
        return;
    }

    const textNode = document.createTextNode(char);
    selection.getRangeAt(0).insertNode(textNode);
    setSelectionAfterElement(textNode);
};

type TextSegment = {
    text: string;
    node: Node;
};

export const getTextSegmentsFromNode = (root: Node) => {
    const segments: Array<TextSegment> = [];

    root.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            segments.push({ text: node.nodeValue || '', node });
        } else if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'BR') {
            segments.push({ text: '\n', node });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            segments.splice(segments.length, 0, ...getTextSegmentsFromNode(node));
        }
    });

    return segments;
};

export const restoreSelection = (input: Node, absoluteAnchorIndex: number, absoluteFocusIndex: number) => {
    const selection = window.getSelection();

    if (!selection) {
        return;
    }

    const textSegments = getTextSegmentsFromNode(input);

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
