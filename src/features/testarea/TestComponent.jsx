import React, { Component } from 'react';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import SimpleMap from './SimpleMap';
import TestPlaceInput from './TestPlaceInput';

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
    state = {
        latlng: {
            lat: 59.96,
            lng: 40.54
        }
    };

    handleSelect = address => {
        geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng => {
            this.setState({
                latLng: latLng
            })
        })
        .catch(error => console.log('Error: ' + error))
    }

    render() {
        const { data, incrementCounter, decrementCounter } = this.props;
        return (
            <div>
                <h2>Test compoenent</h2>
                <h3>The answr is: {data}</h3>
                <Button onClick={incrementCounter} positive content='Increment' />
                <Button onClick={decrementCounter} negative content='Decrement' />
                <TestPlaceInput handleAddress={this.handleSelect}/>
                <SimpleMap key={this.state.latlng.lng} latLng={this.state.latlng} />
            </div>
        )
    }
}
// these actions are aviable as props
// actions are availble as props
export default connect(mapStateToProps, actions)(TestComponent);