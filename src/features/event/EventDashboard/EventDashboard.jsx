import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { EventList } from '../EventList/EventList';
import { createEvent, deleteEvent, updateEvent } from '../eventActions';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import EventActivity from '../EventActivity/EventActivity';

// connect our events to the store
const mapState = (state) => ({
    events: state.events,
    loading: state.async.loading
})

// actions will be available from our props
const actions = {
    createEvent,
    deleteEvent,
    updateEvent
}
class EventDashboard extends Component {

    // handling deletion of events
    handleDeleteEvent = (id) => {
        this.props.deleteEvent(id);
    };

    render() {
        const { events, loading } = this.props;
        if (loading) return <LoadingComponents inverted={false}/>
        return (
            <Grid>
                <Grid.Column width={10}>
                    {/* pass down the events as props */}
                    <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity></EventActivity>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapState, actions)(EventDashboard);