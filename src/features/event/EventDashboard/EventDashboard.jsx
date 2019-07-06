import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { EventList } from '../EventList/EventList';
import EventForm  from '../EventForm/EventForm';
import cuid from 'cuid';

const eventsFromDashBoard = [
    {
        id: '1',
        title: 'Trip to Tower of London',
        date: '2018-03-27T11',
        category: 'culture',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: "Tower of London, St Katharine's & Wapping, London",
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip to Punch and Judy Pub',
        date: '2018-03-28T14',
        category: 'drinks',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: 'London, UK',
        venue: 'Punch & Judy, Henrietta Street, London, UK',
        hostedBy: 'Tom',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        attendees: [
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            }
        ]
    }
]


class EventDashboard extends Component {
    // manage state
    state = {
        events: eventsFromDashBoard,
        isOpen: false,
        selectedState: null // will contain an event object
    };

    // handling if the form to the event will display or not
    // handleIsOpenToggle = () => {
    //     // compare to the prev state and switch to the opposite of that state
    //     this.setState(({ isOpen }) => ({
    //         isOpen: !isOpen
    //     }))
    // }

    // handling opening of form when creating an event
    handleCreateFormOpen = () => {
        this.setState({
            isOpen: true,
            selectedEvent: null
        });
    };

    handleFormCancel = () => {
        this.setState({
            isOpen: false
        });
    };



    // event to create event based on data submitted from the form
    handleCreateEvent = (newEvent) => {
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/users/.png';

        // set the state to the exisiting events + the new event added
        this.setState(({ events }) => ({
            events: [...events, newEvent],
            isOpen: false
        }));
    };

    // handling event selection
    handleSelectEvent = (event) => {
        this.setState({
            selectedEvent: event,
            isOpen: true
        });
    };

    // handling update of an event
    handleUpdateEvent = (updatedEvent) => {
        this.setState(({ events }) => ({
            // assign the array of events with the included updated change to that 1 event
            events: events.map(exisitingEvent => {
                // check for the event
                if (events.id === updatedEvent.id) {
                    return { ...updatedEvent };
                } else {
                    return exisitingEvent;
                }
            }),
            isOpen: false,
            selectedEvent: null
        }));
    };

    // handling deletion of events
    handleDeleteEvent = (id) => {
        this.setState(({ events }) => ({
            events: events.filter(e => e.id !== id)
        }));
    };

    render() {
        const { events, isOpen, selectedEvent } = this.state;
        return (
            <Grid>
                <Grid.Column width={10}>
                    {/* pass down the events as props */}
                    <EventList events={events} selectEvent={this.handleSelectEvent} deleteEvent={this.handleDeleteEvent}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button onClick={this.handleCreateFormOpen} positive content="Create Event" />
                    {isOpen && (
                        <EventForm
                            key={selectedEvent ? selectedEvent.id : 0}
                            updateEvent={this.handleUpdateEvent}
                            selectedEvent={selectedEvent}
                            createEvent={this.handleCreateEvent}
                            cancelFormOpen={this.handleFormCancel} />
                    )}
                </Grid.Column>
            </Grid>
        )
    }
}

export default EventDashboard;