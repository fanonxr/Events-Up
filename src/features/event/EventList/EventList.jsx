import React, { Component, Fragment } from 'react'
import { EventListItem } from './EventListItem';

class EventList extends Component {
    render() {
        return (
            <Fragment>
                {/* loop over the events array and pass it down to each event list item */}

                {this.props.events.map(event => (
                    <EventListItem key={event.id} event={event}/>
                ))}

            </Fragment>
        )
    }
}

export { EventList };