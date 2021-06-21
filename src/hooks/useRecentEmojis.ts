import useLocalStorage from './useLocalStorage';

type RecentEmojiList = Array<string>;
type UseRecentEmojiResult = {
    emojiList: RecentEmojiList;
    addItem: (emoji: string) => void;
};

const useRecentEmojis = (): UseRecentEmojiResult => {
    const [list, setList] = useLocalStorage('recentEmojis', new Array<string>());

    const addItem = (emoji: string) => {
        const hasInList = list.some((value) => value === emoji);

        if (!hasInList) {
            setList([emoji, ...list].slice(0, 24));
        }
    };

    return { emojiList: list, addItem };
};

export default useRecentEmojis;
