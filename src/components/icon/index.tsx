import React, { MouseEvent } from 'react';

import 'theme/fonts/lidaicon.css';

interface PropsType {
    className?: string;
    type: string;
    title?: string;
    style?: object;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const Icon = (props: PropsType) => {
    const { className, type, title, style, onClick } = props;
    let iconClassName = '';
    if (type.indexOf('lidaicon') === 0) {
        iconClassName = type;
    } else {
        iconClassName = `lidaicon-h-${type}`;
    }
    return type ? <i className={'icon ' + iconClassName + ' ' + (className || '')} title={title} style={style} onClick={onClick}></i> : null;
};

export default Icon;
