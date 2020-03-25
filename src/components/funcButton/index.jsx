import React from 'react';

import './styles/funcButton.less';

class FuncButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {props} = this;
        const {type = 'primary'} = props;
        return (
            <div className={`func-button-outer func-button-outer-${type} ${props.className}`} style={props.style} onClick={props.onClick} >
                <button type="button" className={`func-button func-button-${type}`}>
                    <div className={`func-button-before func-button-before-${type}`}>
                        <div className={`func-button-b-line func-button-b-line-${type}`}></div>
                    </div>
                    <span>
                        {props.children}
                    </span>
                    <div className={`func-button-after func-button-after-${type}`}>
                        <div className={`func-button-a-line func-button-a-line-${type}`}></div>
                    </div>
                </button>
            </div>

        );
    }
}

export default FuncButton;
