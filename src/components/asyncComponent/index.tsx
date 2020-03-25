import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
    return class AsyncComponent extends Component<Props, State> {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }
        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component
            });
        }

        render() {
            const C = this.state.component;
            // 可以在这里加上loading
            // return C ? <C {...this.props} /> : <Loading>;
            return C ? <C {...this.props} /> : null;
        }
    };
}
