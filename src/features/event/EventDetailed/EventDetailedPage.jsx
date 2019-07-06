import React from 'react'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

// handle state with redux
const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

    let event = {}

    // check to see if there is an event id and a event in the store
    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0];
    }

    return {
        event
    }
}

const EventDetailPage = ({ event }) => {
    console.log(event);
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}

export default connect(mapState)(EventDetailPage);
