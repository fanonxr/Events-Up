import React, { Component, Fragment } from 'react'
import { EventListItem } from './EventListItem';

class EventList extends Component {
    render() {
        const { events, deleteEvent } = this.props;
        return (
            <Fragment>
                {/* loop over the events array and pass it down to each event list item */}

                {events && events.map(event => (
                    <EventListItem key={event.id} event={event} deleteEvent={deleteEvent}/>
                ))}

            </Fragment>
        )
    }
}

export { EventList };