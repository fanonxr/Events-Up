import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
    // handle form submission using local state
    state = {
        title: '',
        date: '',
        city: '',
        venue: '',
        hostedBy: ''
    };

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
        } else {
            this.props.createEvent(this.state);
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
        const { cancelFormOpen } = this.props;
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
                    <Button onClick={cancelFormOpen} type="button">Cancel</Button>
                </Form>
            </Segment>
        )
    }
}

export default EventForm;