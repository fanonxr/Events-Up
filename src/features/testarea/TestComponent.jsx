import React, { Component } from 'react';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';

// mapping the state to the props
// mapping the store state - to component props
const mapStateToProps = (state) => ({
    data: state.test.data
})

const actions = {
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
    render() {
        const { data, incrementCounter, decrementCounter } = this.props;
        return (
            <div>
                <h2>Test compoenent</h2>
                <h3>The answr is: {data}</h3>
                <Button onClick={incrementCounter} positive content='Increment' />
                <Button onClick={decrementCounter} negative content='Decrement' />
            </div>
        )
    }
}
// these actions are aviable as props
// actions are availble as props
export default connect(mapStateToProps, actions)(TestComponent);