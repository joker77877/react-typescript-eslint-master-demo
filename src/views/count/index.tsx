import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { Cascader } from 'antd';
import { bindActionCreators } from 'redux';
import actionCreators from 'actions/counter';

const Count = props => {
    console.log(props);
    const { actions, counter } = props;
    const { increment, decrement } = actions.counter;
    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake'
                        }
                    ]
                }
            ]
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men'
                        }
                    ]
                }
            ]
        }
    ];

    function onChange(value) {
        console.log(value);
    }
    return (
        <div className="count">
            <span> {counter.get('count')}</span>
            <Cascader options={options} onChange={onChange} placeholder="Please select" />
        </div>
    );
};
// 将store通过props传给组件
const mapStateToProps = state => {
    return {
        browser: state.get('browser'),
        counter: state.get('counter')
    };
};

// 将action通过props.action传给组件调用
const mapDispatchToProps = dispatch => ({
    actions: {
        counter: bindActionCreators(actionCreators, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Count);
