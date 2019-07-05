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
    }
    handleFormSubmit = (event) => {
        event.preventDefault();

        this.props.createEvent(this.state);
        console.log(this.state);
    }

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

export { EventForm };