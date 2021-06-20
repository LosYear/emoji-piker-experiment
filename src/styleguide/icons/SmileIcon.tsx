import React from 'react';

export type SmileIconProps = {
    color?: string;
};

const SmileIcon: React.FC<SmileIconProps> = ({ color = '#000' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
            fill={color}
            d="M8.438 14.297a.9.9 0 011.273.15 2.775 2.775 0 00.516.415c.383.24.97.488 1.773.488.803 0 1.39-.249 1.773-.488a2.773 2.773 0 00.516-.416l.012-.013.002-.003a.9.9 0 011.4 1.132L15 15l.703.562-.001.002-.002.001-.002.004-.007.008-.018.021a3.516 3.516 0 01-.245.254c-.16.15-.394.345-.701.536A5.094 5.094 0 0112 17.15a5.094 5.094 0 01-2.727-.762 4.567 4.567 0 01-.701-.536 3.498 3.498 0 01-.245-.254l-.018-.021-.007-.008-.002-.004-.002-.001s0-.002.702-.564l-.703.562a.9.9 0 01.14-1.265zM10.25 10.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM15 11.5A1.25 1.25 0 1015 9a1.25 1.25 0 000 2.5z"
        />
        <path
            fill={color}
            fillRule="evenodd"
            d="M12 2.1c-5.468 0-9.9 4.432-9.9 9.9s4.432 9.9 9.9 9.9 9.9-4.432 9.9-9.9-4.432-9.9-9.9-9.9zM3.9 12a8.1 8.1 0 1116.2 0 8.1 8.1 0 01-16.2 0z"
            clipRule="evenodd"
        />
    </svg>
);
export default SmileIcon;