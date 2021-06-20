import React from 'react';
import './pageLayout.scss';

const PageLayout: React.FC = ({ children }) => (
    <div className="page-layout">
        <div className="page-layout__inner">{children}</div>
    </div>
);

export default PageLayout;
