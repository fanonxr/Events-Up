import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    //
    let event = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    }

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return event;
}

// get actions and pass them as props
const actions = {
    createEvent,
    updateEvent
}

class EventForm extends Component {
    // handle form submission using local state
    state = {...this.props.event};

    // lifecycle methods

    // check to see if we the selected event inside the prop obj is null
    // set the state to the props of the selected event -- will override the current state
    componentDidMount() {
        if (this.props.selectedEvent !== null) {
            this.setState({
                ...this.props.selectedEvent
            });
        };
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        // check if exisitng vs updated event
        if (this.state.id) {
            this.props.updateEvent(this.state);
            this.props.history.push(`/events/${this.state.id}`);
        } else {
            const newEvent = {
                ...this.state,
                id: cuid(),
                hostPhotoURL: '/assets/user.png'
            }

            // past new event to createEvent function
            this.props.createEvent(newEvent);
            this.props.history.push(`/events`)
        };


    };

    handleInputChange = ({target: {name, value}}) => {
        // get the value from the input field and change the title state
        this.setState({
            // getting the obj prop
            [name]: value
        });
    };

    render() {
        const { title, date, city, venue, hostedBy } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
                    <Form.Field>
                        <label>Event Title</label>
                        <input
                            name='title'
                            value={title}
                            onChange={this.handleInputChange}
                            placeholder="Event title"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input
                            name='date'
                            value={date}
                            onChange={this.handleInputChange}
                            type="date"
                            placeholder="Event Date"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input
                            name='city'
                            value={city}
                            onChange={this.handleInputChange}
                            placeholder="City event is taking place"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input
                            name='venue'
                            value={venue}
                            onChange={this.handleInputChange}
                            placeholder="Enter the Venue of the event" />
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input
                            name='hostedBy'
                            value={hostedBy}
                            onChange={this.handleInputChange}
                            placeholder="Enter the name of person hosting"
                        />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                </Form>
            </Segment>
        )
    }
}

export default connect(mapState, actions)(EventForm);