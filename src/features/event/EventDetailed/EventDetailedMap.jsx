import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Segment, Icon } from 'semantic-ui-react';

const Marker = () => <Icon name='marker' size='big' color='red' />;

const EventDetailedMap = ({ lat, lng }) => {
    const zoom = 14;
    return (
        <div>
            <Segment attached="bottom">
            {/* // Important! Always set the container height explicitly */}
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCKdb0kpwc7Wv550n63coAoq7v29EI76s8&libraries=places' }}
                    defaultCenter={{lat, lng}}
                    defaultZoom={zoom}
                >
                    <Marker
                        lat={lat}
                        lng={lng}
                    />
                </GoogleMapReact>
            </div>
            </Segment>
        </div>
    )
}

export default EventDetailedMap
