/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextAreat from '../../../app/common/form/TextAreat';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';


const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {

    }

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return {
        initialValues: event
    };
};

// get actions and pass them as props
const actions = {
    createEvent,
    updateEvent
}

// category options to pass into props of category field
const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

// redux validation
const validate = combineValidators({
    title: isRequired({ message: 'The event Title is required' }),
    category: isRequired({ message: 'The category is required' }),
    description: composeValidators(
        isRequired({ message: 'Please enter a description' }),
        hasLengthGreaterThan(4)({message: 'Description field needs to be at least 5 characters'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date'),
})

class EventForm extends Component {

    state = {
        cityLatLng: {},
        venueLatlng: {}
    }

    onFormSubmit = (values) => {
        values.venuLatLng = this.state.venueLatlng;
        if (this.props.initialValues.id) {
            this.props.updateEvent(values);
            this.props.history.push(`/events/${this.props.initialValues.id}`);
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                hostedBy: 'Bob'
            }

            // past new event to createEvent function
            this.props.createEvent(newEvent);
            this.props.history.push(`/events/${newEvent.id}`)
        };
    };

    //
    handleCitySelect = selectedCity => {
        geocodeByAddress(selectedCity)
            .then(results => getLatLng(results[0])) // return the latitude and longitude
            .then(latlng => {
                this.setState({
                    cityLatLng: latlng
                })
            })
            .then(() => {
                this.props.change('city', selectedCity)
        })
    }

    handleVenueSelect = selectedVenue => {
        geocodeByAddress(selectedVenue)
            .then(results => getLatLng(results[0])) // return the latitude and longitude
            .then(latlng => {
                this.setState({
                    venuLatLng: latlng
                })
            })
            .then(() => {
                this.props.change('city', selectedVenue)
        })
    }

    render() {
        const { history, initialValues, invalid, submitting, pristine } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color='blue' content='Event Details' />
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>
                            <Field name='title' component={TextInput} placeholder='Name Your Event' />

                            <Field
                                name='category'
                                component={SelectInput}
                                options={category}
                                // multiple={true}
                                placeholder='What is your event about' />

                            <Field name='description' component={TextAreat} rows={3} placeholder='Describe your event' />

                            <Header sub color='blue' content='Event Location Details' />

                            <Field
                                name='city'
                                component={PlaceInput}
                                options={{ types: ['(cities)'] }}
                                onSelect={this.handleCitySelect}
                                placeholder='Event City'
                            />

                            <Field
                                name='venue'
                                component={PlaceInput}
                                options={{
                                    location: new google.maps.LatLng(this.state.cityLatLng),
                                    radius: 1000,
                                    types: ['establishment']
                                }}
                                onSelect={this.handleVenueSelect}
                                placeholder='Event Venue'
                            />

                            <Field
                                name='date'
                                component={DateInput}
                                dateFormat='dd LLL yyyy h:mm a'
                                showTimeSelect
                                timeFormat='HH:mm'
                                placeholder='Event date'
                            />

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button onClick={
                                initialValues.id ? () => history.push(`/events/${initialValues.id}`)
                                :
                                () => history.push('/events')}
                                type="button">
                                Cancel
                                </Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapState, actions)(reduxForm({ form: 'eventForm', validate })(EventForm));