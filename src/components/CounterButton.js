import React, { Component } from "react";

class CounterButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    updateCount = () => {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
    }

    render() {
        return (
            <button color={this.props.color} onClick={this.updateCount}>
                Count: {this.state.count}
            </button>
        );

    }
}

export default CounterButton;