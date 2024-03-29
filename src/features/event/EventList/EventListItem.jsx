import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { EventListAttendee } from './EventListAttendee';
import { format } from 'date-fns';

class EventListItem extends Component {
    render() {
        // destrucure the event from the props
        const { event, deleteEvent } = this.props;
        return (
            <div>
                <Segment.Group>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                                <Item.Content>
                                    <Item.Header>{event.title}</Item.Header>
                                    <Item.Description>
                                        Hosted by {event.hostedBy}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment>
                        <span>
                            <Icon name="clock" /> {format(event.date.toDate(), 'EEEE do LLL')} at {format(event.date.toDate(), 'h:mm a')} |
                            <Icon name="marker" /> {event.venue}
                        </span>
                    </Segment>
                    <Segment secondary>
                        <List horizontal>
                            {event.attendees &&
                                Object.values(event.attendees).map((attendee, index) => (
                                <EventListAttendee key={index} attendee={attendee} />
                            ))}
                        </List>
                    </Segment>
                    <Segment clearing>
                        <span>{event.description}</span>
                        <Button
                            onClick={() => deleteEvent(event.id)}
                            as="a"
                            color="red"
                            floated="right"
                            content="Delete"
                        />
                        <Button
                            as={Link}
                            to={`/events/${event.id}`}
                            color="teal"
                            floated="right"
                            content="View"
                        />
                    </Segment>
                </Segment.Group>
            </div>
        )
    }
}

export { EventListItem };
