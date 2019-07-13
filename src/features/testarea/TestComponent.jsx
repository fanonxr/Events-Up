import React, { Component } from 'react';
import { connect } from 'react-redux';

import { incrementAsync, decrementAsync} from './testActions';
import { Button } from 'semantic-ui-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


import SimpleMap from './SimpleMap';
import TestPlaceInput from './TestPlaceInput';
import { openModal } from '../modals/modalActions';
// mapping the state to the props
// mapping the store state - to component props
const mapStateToProps = (state) => ({
    data: state.test.data,
    loading: state.async.loading,
    buttoneName: state.async.elementName
});

const actions = {
    incrementAsync,
    decrementAsync,
    openModal
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
        const { data, incrementAsync, decrementAsync, openModal, loading, buttonName } = this.props;
        return (
            <div>
                <h2>Test compoenent</h2>
                <h3>The answr is: {data}</h3>

                <Button loading={buttonName === 'increment' && loading} onClick={(e) => incrementAsync(e.target.name)} positive content='Increment' />

                <Button loading={buttonName === 'decrement' && loading} onClick={(e) => decrementAsync(e.target.name)} negative content='Decrement' />

                <Button onClick={() => openModal('TestModal', { data: 43 })} positive content='Open modal' />

                <TestPlaceInput handleAddress={this.handleSelect} />

                <SimpleMap key={this.state.latlng.lng} latLng={this.state.latlng} />
            </div>
        )
    }
}
// these actions are aviable as props
// actions are availble as props
export default connect(mapStateToProps, actions)(TestComponent);